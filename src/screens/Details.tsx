import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { StoreState } from "../store/reducer";

export const Details: React.FC<{}> = () => {
  const params = useParams();
  const metaInfo = useSelector((state: StoreState) =>
    state.repositories.find(
      (repository: any) => repository.id === +(params.idRepository ?? -1)
    )
  );

  const [contributors, setContributors] = useState<any[]>([]);

  const loadRepoInfo = async () => {
    // TODO: await detailed repo info via github api
    setContributors([]);
  };

  useEffect(() => {
    if (metaInfo) {
      console.log("repo in meta info", metaInfo);
      loadRepoInfo();
    }
  }, [metaInfo]);

  return (
    <div>
      Contributors for {params.idRepository} {metaInfo.name}
      <div>
        {contributors.map(() => (
          <>CONTRIBUTOR TBD</>
        ))}
      </div>
    </div>
  );
};
