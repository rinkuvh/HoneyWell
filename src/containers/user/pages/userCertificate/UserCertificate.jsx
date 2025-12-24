import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { checkStudentCertificate } from "../../../../redux/services/UserService";
import { CheckCircleOutline, ErrorOutline } from "@mui/icons-material";
import PageIndex from "../../../PageIndex";
import Index from "../../../Index";

const UserCertificate = () => {
  const params = useParams();
  const [certificateDetails, setCertificateDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetchCertificateDetails = async () => {
    try {
      const result = await checkStudentCertificate(params?.id, params?.type, params?.typeId);
      if (result?.status === 200) {
        setCertificateDetails(result?.data);
      } else {
        setError(true);
      }
    } catch {
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCertificateDetails();
  }, []);

  if (loading) {
    return (
      <Index.Box className="certificate-container">
        <Index.Card className="certificate-card">
          <PageIndex.PageLoader />
        </Index.Card>
      </Index.Box>
    );
  }

  return (
    <Index.Box className="certificate-container">
      <Index.Card className="certificate-card">
        {error || !certificateDetails ? (
          <>
            <ErrorOutline className="error-icon" sx={{ fontSize: 60 }} />
            <Index.Typography
              variant="h5"
              className="certificate-title"
              color="error"
            >
              Certificate Not Found
            </Index.Typography>
            <Index.Typography variant="body1" className="certificate-text">
              The certificate you're looking for could not be verified.
            </Index.Typography>
          </>
        ) : (
          <>
            <CheckCircleOutline
              className="success-icon"
              sx={{ fontSize: 60 }}
            />
            <Index.Typography variant="h5" className="certificate-title">
              Certificate Verified
            </Index.Typography>

            <Index.Typography variant="body1" className="certificate-text">
              This certificate is valid and issued to
            </Index.Typography>

            <Index.Typography variant="h6" className="certificate-text">
              {certificateDetails?.name}
            </Index.Typography>
            <Index.Typography
              variant="body2"
              color="text.secondary"
              className="certificate-text"
            >
              Issued on:{" "}
              {Index.moment(certificateDetails?.created_at).format(
                "MMM D, YYYY"
              )}
            </Index.Typography>
          </>
        )}
      </Index.Card>
    </Index.Box>
  );
};

export default UserCertificate;
