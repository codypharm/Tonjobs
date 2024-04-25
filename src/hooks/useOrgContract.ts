import { Organisation } from "../../contract/wrappers/Organisation";
import { useAsyncInitialize } from "@/hooks/useAsyncInitialize";
import { useTonClient } from "@/hooks/useTonClient";
import { Address, OpenedContract, toNano } from "ton-core";
import { useTonConnect } from "./useTonConnect";

interface IJob {
  repoId: number;
  issueId: number;
  isActive: boolean;
  reward: number;
  isCompleted: boolean;
  comletedBy: string;
}

export function useOrganisationContract() {
  const { client } = useTonClient();
  const { wallet, sender } = useTonConnect();

  const orgContract = useAsyncInitialize(async () => {
    if (!client) return;

    const contract = Organisation.fromAddress(
      Address.parse("Enter address here")
    );

    //@ts-ignore
    return client.open(contract) as OpenedContract<Organisation>;
  }, [client]);

  return {
    addRepo: async (url: string) => {
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
    },

    addJob: async (job: IJob) => {
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
    },
  };
}
