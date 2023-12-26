import { useNavigate } from "react-router-dom";
import Button from "./Button";

function ButtonBack() {
  const navigate = useNavigate();

  const handleBackClick = (e) => {
    e.preventDefault();
    console.log("Back button clicked");
    navigate(-1);
  };

  return (
    <Button type="back" onClick={handleBackClick}>
      &larr; Back
    </Button>
  );
}
export default ButtonBack;
