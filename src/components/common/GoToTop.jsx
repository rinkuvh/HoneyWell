import { useEffect } from "react";
import PageIndex from "../../containers/PageIndex";

export default function GoToTop() {
  const routePath = PageIndex.useLocation();
  const onTop = () => {
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    onTop();
  }, [routePath]);

  return null;
}
