import { toNano } from '@ton/core';
import { Organisation } from '../wrappers/Organisation';
import { NetworkProvider } from '@ton/blueprint';

export async function run(provider: NetworkProvider) {
    const organisation = provider.open(await Organisation.fromInit(35n));

    await organisation.send(
        provider.sender(),
        {
            value: toNano('0.05'),
        },
        {
            $$type: 'Deploy',
            queryId: 0n,
        },
    );

    await provider.waitForDeploy(organisation.address);

    // run methods on `organisation`
}
