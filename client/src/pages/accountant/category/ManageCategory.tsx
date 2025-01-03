import AddCategory from "../../../components/addCategory/AddCategory";
import DisplayCategory from "../../../components/displayCategorySubcategory/DisplayCategorySubcategory";

function ManageCategory() {
  return (
    <>
      <h1>GESTION DES CATEGORIES</h1>
      <h2>Nouvelle catégorie</h2>
      <AddCategory />
      <DisplayCategory />
    </>
  );
}

export default ManageCategory;
