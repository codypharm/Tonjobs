import { Organisation } from "../../contract/wrappers/Organisation";
import { useAsyncInitialize } from "@/hooks/useAsyncInitialize";
import { useTonClient } from "@/hooks/useTonClient";
import { Address, OpenedContract, fromNano, toNano } from "ton-core";
import { useTonConnect } from "./useTonConnect";

interface IJob {
  repoId: number;
  issueId: number;
  isActive: boolean;
  reward: number;
  isCompleted: boolean;
  comletedBy: Address;
}

interface IJobCompleted {
  jobID: number;
  prUrl: number;
  contributorAdd: Address;
}

export function useOrganisationContract() {
  const { client } = useTonClient();
  const { wallet, sender } = useTonConnect();

  const orgContract = useAsyncInitialize(async () => {
    if (!client) return;

    const contract = Organisation.fromAddress(
      Address.parse("EQDi7HR8NxcHIHonz85O6WGqec_T6Vh2geI7WLQZNI6Ta0_R") // replaCE  with actuall address
    );

    //@ts-ignore
    return client.open(contract) as OpenedContract<Organisation>;
  }, [client]);

  const addRepo = async (url: string) => {
    //@ts-ignore
    await orgContract?.send(
      sender,
      {
        value: toNano("0.05"),
      },
      {
        $$type: "AddRepo",
        repoUrl: url,
      }
    );
  };

  const addJob = async (job: IJob) => {
    //@ts-ignore
    await orgContract?.send(
      sender,
      {
        value: toNano("0.05"),
      },
      {
        $$type: "AddJob",
        ...job,
      }
    );
  };

  const activateJob = async (
    repoId: number,
    issueId: number,
    amount: number
  ) => {
    //@ts-ignore
    const charge = Number(await orgContract?.getCharge());
    const storageCharge = Number(0.05);
    const reward = charge + storageCharge + amount;

    //@ts-ignore
    const res = await orgContract?.send(
      sender,
      {
        value: toNano(reward.toString()),
      },
      {
        $$type: "ActivateJob",
        repoId: BigInt(repoId),
        issueId: BigInt(issueId),
      }
    );
    console.log(res);
  };

  const completedJob = async (job: IJobCompleted) => {
    //@ts-ignore
    await orgContract?.send(
      sender,
      {
        value: toNano("0.05"),
      },
      {
        $$type: "JobCompleted",
        ...job,
      }
    );
  };

  const getBalance = async () => {
    //@ts-ignore
    return await orgContract?.getBalance();
  };

  const getJob = async (issueId: number) => {
    //@ts-ignore
    const reward = await orgContract?.getJobReward(BigInt(issueId));
    //@ts-ignore
    const isActive = await orgContract?.getJobState(BigInt(issueId));

    //@ts-ignore
    // const job = await orgContract?.getJob(BigInt(issueId));
    // console.log(job);
    // @ts-ignore
    const completedBy = await orgContract?.getJobCompletedBy(BigInt(issueId));
    //@ts-ignore
    // const bal = await orgContract?.getDepositData(
    //   Address.parse("kQDJrhMujiaTPJ7qdvLHd3Sp7QwJOVGh5TN4GaSPxHVVSRJC")
    // );

    return {
      isActive,
      reward: reward && fromNano(reward),
      completedBy: undefined,
    };
  };

  return {
    addRepo,
    addJob,
    activateJob,
    completedJob,
    getBalance,
    getJob,
    orgContract,
  };
}
