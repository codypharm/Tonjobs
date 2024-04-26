import { Blockchain, SandboxContract, TreasuryContract } from '@ton/sandbox';
import { toNano } from '@ton/core';
import { Organisation } from '../wrappers/Organisation';
import '@ton/test-utils';

describe('Organisation', () => {
    let blockchain: Blockchain;
    let deployer: SandboxContract<TreasuryContract>;
    let organisation: SandboxContract<Organisation>;

    beforeEach(async () => {
        blockchain = await Blockchain.create();

        organisation = blockchain.openContract(await Organisation.fromInit());

        deployer = await blockchain.treasury('deployer');

        const deployResult = await organisation.send(
            deployer.getSender(),
            {
                value: toNano('0.05'),
            },
            {
                $$type: 'Deploy',
                queryId: 0n,
            }
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
});
