import { UseFormWatch } from "react-hook-form";
import JobCard from "../Cards/JobCard";

type PreviewModeModalProps = {
  watch: UseFormWatch<any>;
  formData: {
    emptype: string;
    primtg: string;
    tagsArray: string[];
    locns: string;
    desc: string;
    minSalary: string;
    maxSalary: string;
    how2apply: string;
    benefitsArray: string[];
    currencyType: string;
    feedback: string;
  };
  handlePreview: () => void;
};

const PreviewModeModal = ({
  watch,
  formData,
  handlePreview,
}: PreviewModeModalProps) => {
  return (
    <div className="fixed inset-0 flex md:justify-center items-center z-[80] w-full overflow-auto">
      <div className="w-fit h-fit md:px-10 sm:px-6 px-3 rounded-lg">
        <h3 className="text-blue-500 font-bold md:text-3xl sm:text-2xl text-lg">
          Preview
        </h3>
        <p className="text-gray-200 md:text-base sm:text-sm text-xs py-3">
          Here is a preview of how your job post will look like, with the
          details:
        </p>
        <JobCard
          type="preview"
          job={{
            company_name: watch && watch("company_name"),
            position: watch && watch("position"),
            emptype: formData.emptype,
            primtg: formData.primtg,
            tags: formData.tagsArray,
            locns: formData.locns,
            desc: formData.desc,
            minsal: Number(formData.minSalary),
            maxsal: Number(formData.maxSalary),
            how2apply: formData.how2apply,
            benefits: formData.benefitsArray,
            email4jobappl: watch && watch("email4jobappl"),
            apply_url: watch && watch("apply_url"),
          }}
          seekerside={false}
        />

        <div className="w-full flex mt-3">
          <button
            className="inline-block bg-red-500 hover:bg-red-700 text-white font-bold px-4 py-2 rounded-lg mx-auto"
            onClick={handlePreview}
          >
            Go Back
          </button>
        </div>
      </div>
    </div>
  );
};

export default PreviewModeModal;
