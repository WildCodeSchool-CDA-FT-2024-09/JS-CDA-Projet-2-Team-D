import { Button } from "@mui/material";
import SyncLockIcon from "@mui/icons-material/SyncLock";

interface GeneratePasswordProps {
  handleGeneratePassword: () => void;
}

function GeneratePassword({ handleGeneratePassword }: GeneratePasswordProps) {
  return (
    <>
      <Button
        aria-label="Générer un mot de passe aléatoire"
        startIcon={<SyncLockIcon />}
        onClick={handleGeneratePassword}
      >
        Générer un mot de passe aléatoire
      </Button>
    </>
  );
}

export default GeneratePassword;
