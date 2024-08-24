import Swal from "sweetalert2";

interface SwalFailedProps {
  title: string;
  error: any;
}

export const swalFailed = ({ title, error }: SwalFailedProps) => {
  Swal.fire({
    title: title,
    text: error?.response?.data?.username[0] || "An error occurred",
    showClass: {
      popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
            `,
    },
    hideClass: {
      popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
            `,
    },
  });
};

interface SwalSuccessProps {
  title: string;
  message: string;
}

export const swalSuccess = ({ title, message }: SwalSuccessProps) => {
  Swal.fire({
    title: title,
    text: message,
    icon: "success",
    showClass: {
      popup: `
            animate__animated
            animate__fadeInUp
            animate__faster
            `,
    },
    hideClass: {
      popup: `
            animate__animated
            animate__fadeOutDown
            animate__faster
            `,
    },
  });
};
