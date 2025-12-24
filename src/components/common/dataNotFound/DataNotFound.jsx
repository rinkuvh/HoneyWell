import React from "react";
import Index from "../../../containers/Index";

export default function DataNotFound({ colSpan,moduleName }) {
  return (
    <Index.TableRow>
      <Index.TableCell className="table-not-found-td" colSpan={colSpan}>
        <Index.Box className="data-not-found-main">
          <Index.Typography className="data-not-found-text">
            {moduleName} Not Found
          </Index.Typography>
        </Index.Box>
      </Index.TableCell>
    </Index.TableRow>
  );
}
