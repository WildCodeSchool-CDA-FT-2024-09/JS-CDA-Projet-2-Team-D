import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const ButtonContainer = styled("div")({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "100%",
  marginTop: "10px",
});

interface BtnUploadProps {
  onFileChange: (file: File | null) => void;
}

const BtnUpload: React.FC<BtnUploadProps> = ({ onFileChange }) => {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] || null;
    onFileChange(file);
  };

  return (
    <ButtonContainer>
      <Button
        component="label"
        variant="contained"
        startIcon={<CloudUploadIcon />}
        aria-label="Télécharger un fichier"
      >
        Ajouter un fichier
        <VisuallyHiddenInput
          type="file"
          onChange={handleFileChange}
          aria-label="Sélectionner un fichier à télécharger"
        />
      </Button>
    </ButtonContainer>
  );
};

export default BtnUpload;
