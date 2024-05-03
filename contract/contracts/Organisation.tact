import "@stdlib/deploy";
/* 
what we need? 
1. organisation deploys this contract
2. org can have multiple repos, must be able to add repos
3. jobs can be added to repos, jobs must have activation option, reward, completed bool, 
4. contract can have balance
*/

struct Job {
    repoId: Int as int64;
    issueId: Int as int64;
    isActive: Bool = false;
    reward: Int as coins;
    isCompleted: Bool = false;
    completedBy: Address;
    owner: Address;
    employer:Address;
}

struct Deposit {
    user: Address;
    amount: Int as coins;
}

struct Income {
    user: Address;
    amount: Int as coins;
}



message JobCompleted {
    issueId: Int as int64;
}

message JobCancelled {
    issueId: Int as int64;
}
message ActivateJob {
    repoId: Int as int64;
    issueId: Int as int64;
}

message VerifyJobCancellation {
    issueId: Int as int64;
}

message VerifyJobClaim{
    issueId: Int as int64;
    completedBy: Address;
}


message ChangeOperator{
    operator: Address;
}




contract Organisation with Deployable {
    owner: Address;
    operator: Address ; // address of verifier
    jobs: map<Int, Job>;
    userDeposits: map<Address, Deposit> ;
    userIncomes: map<Address, Income>;
    jobCount: Int = 0; // nuumber of jobs added starts with key = 1
    charge: Int as coins = ton("0.5");
    accountBalance: Int as coins = ton("0");
   id: Int as int32;

    init(id: Int){
        self.owner = sender();
        self.operator = sender();
        self.id = id;
    }

    


    // Admin tasks
    receive (msg : ChangeOperator) {
        require (sender() == self.owner, "Invalid command");
        self.operator = msg.operator;
    }

    receive ("withdraw") {
        require(sender() == self.owner, "Invalid command");
         send(SendParameters{
                to: sender(),
                bounce: true,
                value: self.accountBalance,
                mode: SendIgnoreErrors
            }
        );
    }

    //Job Tasks
    receive(msg: ActivateJob){
        let limit :Int  = ton("0.05") + self.charge;
        let ctx : Context = context();
        let reward : Int  = ctx.value - limit;
        let deps: Deposit? = self.userDeposits.get(sender());
        
        require(ctx.value > limit, "Value sent is less than limit");
        require (reward > 0, "Reward is too low");
        //amount made by admin
        self.accountBalance += self.charge;

        //check if record exists
        if(deps != null){
            let mydeps: Deposit = self.userDeposits.get(sender())!!;
            let bal: Int  = mydeps.amount;
            bal += reward;
            self.userDeposits.set(sender(),
                Deposit{user: sender(), amount: bal}
            );
        }else{
            self.userDeposits.set(sender(),
            Deposit{user: sender(), amount: reward}
            );
        }
       
        self.jobs.set(msg.issueId,
            Job{repoId: msg.repoId, issueId: msg.issueId, isActive: true, reward: reward, completedBy: newAddress(0,0),owner: newAddress(0,0), employer: sender()}
        );
       
    }

    receive (msg: VerifyJobCancellation){
        let job : Job = self.jobs.get(msg.issueId)!!;
        require(sender() == job.employer, "Invalid command");
         self.jobs.set(msg.issueId,
            Job{repoId: job.repoId, issueId: job.issueId, isActive: false, reward: job.reward, completedBy: job.completedBy,owner: sender(), employer: job.employer}
        );
    }

//run after verifying cancellation.
    receive(msg: JobCancelled){
    
        let job: Job = self.jobs.get(msg.issueId)!!;
        require(job.isActive == false, "Job still active");
        require(job.reward > 0, "Job already claimed");
        require(job.employer == sender(), "Unauthorized job cancellation");
        
        let depsData: Deposit? = self.userDeposits.get(sender());
        if(depsData != null){
            let deps: Deposit = self.userDeposits.get(sender())!!;
            let bal: Int  = deps.amount;
            bal -= job.reward;
            self.userDeposits.set(sender(),
                Deposit{user: sender(), amount: bal}
            );
        } 
        

        self.jobs.set(msg.issueId,
            Job{repoId: job.repoId, issueId: job.issueId, isActive: false, reward: ton("0"), completedBy: job.completedBy,owner: sender(), employer: job.employer}
        );
        send(SendParameters{
                to: sender(),
                bounce: true,
                value: job.reward,
                mode: SendIgnoreErrors
            }
        );
    }


    // for contributor
  receive (msg: VerifyJobClaim){
        let job : Job = self.jobs.get(msg.issueId)!!;
        require (sender() == self.operator, "Unauthorized operator");
        require(job.isActive == true, "Job not active");
         self.jobs.set(msg.issueId,
            Job{repoId: job.repoId, issueId: job.issueId, isActive: false, reward: job.reward, completedBy:msg.completedBy ,owner: msg.completedBy,employer: job.employer}
        );
    }

    receive(msg: JobCompleted){
    
        let job: Job = self.jobs.get(msg.issueId)!!;
        require(job.isActive == false, "Job still active");
        require(job.reward > 0, "Job already claimed");
        require(job.owner == sender(), "Invlid job claim");
        let incsData: Income? = self.userIncomes.get(sender());
       
        if(incsData != null){
            let incs : Income = self.userIncomes.get(sender())!!;
            let bal: Int  = incs.amount;
            bal += job.reward;
            self.userIncomes.set(sender(),
                Income{user: sender(), amount: bal}
            );
        }else{
            self.userIncomes.set(sender(),
                Income{user: sender(), amount: job.reward}
            );
        }

        self.jobs.set(msg.issueId,
             Job{repoId: job.repoId, issueId: job.issueId, isActive: false, reward: ton("0"), completedBy: job.completedBy,owner: sender(), employer: job.employer, isCompleted: true}
        );
        send(SendParameters{
                to: sender(),
                bounce: true,
                value: job.reward,
                mode: SendIgnoreErrors
            }
        );
    }

    get fun balance(): String {
        return self.accountBalance.toCoinsString();
    }

    get fun charge(): String {
        return self.charge.toCoinsString();
    }

    get fun job(id: Int) : Job?{
        let data : Job? = self.jobs.get(id);
        if(data != null){
            let job : Job =  self.jobs.get(id)!!;
            return job;
        }else{
            return Job{repoId: 0, issueId: 0, isActive: false, reward: 0, completedBy: newAddress(0,0),owner: newAddress(0,0), employer: newAddress(0,0)};
        }
    }

    get fun jobState(id: Int) : Bool{
        let data : Job? = self.jobs.get(id);
        if(data != null){
            let job: Job =  self.jobs.get(id)!!;
            let state: Bool =  job.isActive;
            return state;
        }else{
            return false;
        }
    }

get fun jobReward(id: Int) : Int{
        let data : Job? = self.jobs.get(id);
        if(data != null){
            let job: Job =  self.jobs.get(id)!!;
            let reward: Int =  job.reward;
            return reward;
        }else{
            return 0;
        }
    }

    get fun jobCompletedBy(id: Int) : Address{
        let data : Job? = self.jobs.get(id);
        if(data != null){
            let job: Job =  self.jobs.get(id)!!;
            let by: Address =  job.completedBy;
            return by;
        }else{
            return newAddress(0,0);
        }
    }



    get fun incomeData(addr : Address) : Income? {
        
        let data: Income? = self.userIncomes.get(addr);
        if(data != null){
            return self.userIncomes.get(addr)!!;
        }else{
            return Income{
                user: sender(),
                amount:0
            };
        }
    }

     get fun depositData(addr : Address) : String?  {
        let data: Deposit? =  self.userDeposits.get(addr);
        if(data != null){
            let defData: Deposit =  self.userDeposits.get(addr)!!;
            return defData.amount.toCoinsString();
        }else{
            return "unknown";
        }
       
    }

    get fun financeOperator() : Address {
        return self.operator;
    }

    // get fun getJobs(): map<Int, Jobs> {
    //     return self.jobs;
    // }

    // get fun getRepos(): map<Int, Repos> {
    //     return self.repos;
    // }

    // get fun withdrawableAmount(): Int {
    //     return self.getUsableBalance();
    // }
}