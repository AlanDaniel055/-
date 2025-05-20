import BlocDeNotas from "../../../../../../components/note/BlocDeNotas";

const NotesPage = () => {
  return (
    <div className="w-full">
      <div
        className="border border-gray-200 bg-white shadow-none w-full rounded-md p-6"
        style={{ boxShadow: "none" }}
      >
        <BlocDeNotas />
      </div>
    </div>
  );
};

export default NotesPage;
