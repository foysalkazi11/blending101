import { forwardRef, useState, useCallback, SetStateAction, Dispatch } from "react";

import ChallengeList from "./_list.component";
import ChallengeForm from "./_form.component";
import styles from "./index.module.scss";
import { Challenge } from "@/app/types/challenge.types";

interface SettingsProps {
  showFormState: [boolean, Dispatch<boolean>];
  currentChallenge: string;
  challenges: Challenge[];
  elementRef?: any;
  height?: string;
  hideSettings: () => void;
}

const Settings = forwardRef((props: SettingsProps, ref) => {
  const { showFormState, currentChallenge, challenges, elementRef, height } = props;
  const [showForm, setShowForm] = showFormState;
  const [challenge, setChallenge] = useState<Challenge>(null);

  const editFormHandler = useCallback(
    (data) => {
      setShowForm(true);
      setChallenge(data);
    },
    [setShowForm],
  );

  return (
    <div ref={elementRef} className={styles.settings} style={{ height }}>
      <div>
        {showForm ? (
          <ChallengeForm ref={ref} challenge={challenge} setChallenge={setChallenge} setShowForm={setShowForm} />
        ) : (
          <ChallengeList
            currentChallenge={currentChallenge}
            challenges={challenges}
            editFormHandler={editFormHandler}
          />
        )}
      </div>
    </div>
  );
});

Settings.displayName = "Settings";

export default Settings;
