export const initialJobState = {
  jobId: null,
  isJobSelected: false,
  jobList: [],
  orgActiveJobList: [],
};

export const jobReducer = (state: any, action: any) => {
  switch (action.type) {
    case "SELECT_JOB": {
      localStorage.setItem(
        "isJobSelected",
        JSON.stringify(action.payload.isJobSelected)
      );
      localStorage.setItem("jobId", JSON.stringify(action.payload.jobId));
      return {
        ...state,
        isJobSelected: action.payload.isJobSelected,
        jobId: action.payload.jobId,
      };
    }

    case "INIT_JOB": {
      return {
        ...state,
        jobList: action.payload,
      };
    }

    case "INIT_ORG_ACTIVE_JOB_LIST": {
      return {
        ...state,
        orgActiveJobList: action.payload,
      };
    }

    case "ADD_JOB": {
      return {
        ...state,
        jobList: [...state.jobList, action.payload],
      };
    }
    case "CLEAR_JOB": {
      localStorage.clear();
      return {
        ...state,
        isJobSelected: false,
        jobId: null,
      };
    }
    default:
      return state;
  }
};
