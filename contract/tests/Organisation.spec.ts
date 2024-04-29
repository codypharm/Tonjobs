import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Organisation } from '../wrappers/Organisation';
import '@ton/test-utils';

describe('Organisation', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let newOperator: SandboxContract<TreasuryContract>;
    let organisation: SandboxContract<Organisation>;
    let id = BigInt(Math.floor(Math.random() * 10));

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        organisation = blockchain.openContract(await Organisation.fromInit(id));

        deployer = await blockchain.treasury('deployer');
        newOperator = await blockchain.treasury('newPerson');

        const deployResult = await organisation.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            },
        );

        expect(deployResult.transactions).toHaveTransaction({
            from: deployer.address,
            to: organisation.address,
            deploy: true,
            success: true,
        });
    });

    it('should deploy', async () => {
        // the check is done inside beforeEach
        // blockchain and organisation are ready to use
    });

    //Operator change test
    it('should change operator', async () => {
        const initialOperator = await organisation.getFinanceOperator();

        await organisation.send(
            deployer.getSender(),
            {
                value: toNano(0.02),
            },
            {
                $$type: 'ChangeOperator',
                operator: newOperator.address,
            },
        );

        const changedOperator = await organisation.getFinanceOperator();
        expect(changedOperator).toEqualAddress(newOperator.address);
    });

    it('should reject', async () => {
        const initialOperator = await organisation.getFinanceOperator();

        await expect(
            organisation.send(
                newOperator.getSender(),
                {
                    value: toNano(0.02),
                },
                {
                    $$type: 'ChangeOperator',
                    operator: newOperator.address,
                },
            ),
        ).rejects;
    });

    it('should activate job', async () => {
        const charge = Number(await organisation.getCharge());
        const storageCharge = Number(0.05);
        const reward = charge + storageCharge + 1.5;

        await organisation.send(
            deployer.getSender(),
            {
                value: toNano(reward),
            },
            {
                $$type: 'ActivateJob',
                repoId: 13n,
                issueId: 2n,
            },
        );

        const userBalance = await organisation.getDepositData(deployer.address);
        expect(userBalance).toEqual('1.5');
    });

    it('should increase account balance', async () => {
        const charge = Number(await organisation.getCharge());
        const storageCharge = Number(0.05);
        const reward = charge + storageCharge + 1.5;
        const acctBalBefore = await organisation.getBalance();

        await organisation.send(
            deployer.getSender(),
            {
                value: toNano(reward),
            },
            {
                $$type: 'ActivateJob',
                repoId: 13n,
                issueId: 2n,
            },
        );

        const acctBalAfter = await organisation.getBalance();

        expect(acctBalAfter).toEqual('0.5');
    });

    it('should reject due low value', async () => {
        const charge = Number(await organisation.getCharge());
        const storageCharge = Number(0.05);
        // add only limit
        const reward = charge + storageCharge;

        expect(
            await organisation.send(
                deployer.getSender(),
                {
                    value: toNano(reward),
                },
                {
                    $$type: 'ActivateJob',
                    repoId: 13n,
                    issueId: 2n,
                },
            ),
        ).rejects;
    });

    it('should verify job cancellation', async () => {
        const charge = Number(await organisation.getCharge());
        const storageCharge = Number(0.05);
        const reward = charge + storageCharge + 1.5;

        await organisation.send(
            deployer.getSender(),
            {
                value: toNano(reward),
            },
            {
                $$type: 'ActivateJob',
                repoId: 13n,
                issueId: 2n,
            },
        );

        const initialJob = await organisation.getJob(2n);
        const initialBal = await deployer.getBalance();

        await organisation.send(
            deployer.getSender(),
            {
                value: toNano(0.02),
            },
            {
                $$type: 'VerifyJobCancellation',
                issueId: 2n,
            },
        );

        await organisation.send(
            deployer.getSender(),
            {
                value: toNano(0.05),
            },
            {
                $$type: 'JobCancelled',
                issueId: 2n,
            },
        );

        const expectedBal = toNano('1.5') + initialBal - toNano('0.07');

        const finaleJob = await organisation.getJob(2n);

        expect(finaleJob?.isActive).toBe(false);
    });

    it('should claim job reward', async () => {
        const charge = Number(await organisation.getCharge());
        const storageCharge = Number(0.05);
        const reward = charge + storageCharge + 1.5;

        await organisation.send(
            deployer.getSender(),
            {
                value: toNano(reward),
            },
            {
                $$type: 'ActivateJob',
                repoId: 13n,
                issueId: 2n,
            },
        );

        await organisation.send(
            deployer.getSender(),
            {
                value: toNano(0.02),
            },
            {
                $$type: 'VerifyJobClaim',
                issueId: 2n,
                completedBy: newOperator.address,
            },
        );

        const initialBal = await newOperator.getBalance();

        await organisation.send(
            newOperator.getSender(),
            {
                value: toNano(0.05),
            },
            {
                $$type: 'JobCompleted',
                issueId: 2n,
            },
        );

        const finalBal = await newOperator.getBalance();

        expect(finalBal).toBeGreaterThan(initialBal);
    });
});
