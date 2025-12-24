import React from "react";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./CkEditor.css"
import { useField } from "formik";
import Index from "../../../containers/Index";

const CommonCkEditor = ({ name}) => {
    const [field, meta, helpers] = useField(name);
  const handleChange = (event, editor) => {
    const data = editor.getData();

    helpers.setValue(data);
  };

  const handleBlur = () => {
    helpers.setTouched(true);
  };

  return (
    <>
      <CKEditor
        editor={ClassicEditor}
        data={field.value}
        onChange={handleChange}
        onBlur={handleBlur}
        contenteditable="true"
        config={{
          licenseKey: "GPL",
          toolbar: [
            "heading",
            "|",
            "bold",
            "italic",
            "blockQuote",
            "bulletedList",
            "numberedList",
            "link",
            "|",
            "undo",
            "redo",
          ],
        }}
        onReady={(editor) => {
          // You can store the "editor" and use when it is needed.
        }}
        onFocus={(event, editor) => {}}
      />
      {meta.touched && meta.error && (
        <Index.Box className="ckeditor-error">{meta.error}</Index.Box>
      )}
    </>
  );
};

export default CommonCkEditor;
