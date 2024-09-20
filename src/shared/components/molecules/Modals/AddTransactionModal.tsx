import {
  Description,
  Dialog,
  DialogBackdrop,
  DialogPanel,
  DialogTitle,
} from "@headlessui/react";
import { useFormik } from "formik";
import TextArea from "../../atoms/TextArea";
import { useEffect, useRef, useState } from "react";
import IconButton from "../../atoms/IconButton";
import {
  ArrowUpTrayIcon,
  CameraIcon,
  ClipboardIcon,
  PencilIcon,
} from "@heroicons/react/16/solid";
import TextField from "../../atoms/TextField";
import { CATEGORIES_HARD_CODED } from "../../../../assets/categories";
import clsx from "clsx";
import MultiSelectableChip from "../../atoms/MultiSelectableChip";
import { ACCOUNTS_HARD_CODED } from "../../../../assets/accounts";
import { handleSelect } from "../../../utils/selectionHandler";
import { PlusCircleIcon } from "@heroicons/react/24/outline";
import toast from "react-hot-toast";
// import { handleSelect } from "../../../utils/selectionHandler";
import { AnimatePresence, motion } from "framer-motion";
import { AiDetectionMode } from "../../../types/commonEnums";

interface AddTransactionModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  buttonText?: string;
  buttonAction?: () => void;
}

const AddTransactionModal: React.FC<AddTransactionModalProps> = ({
  isOpen,
  onClose,
  title = "Payment successful",
  description = "Your payment has been successfully submitted. We’ve sent you an email with all of the details of your order.",
  buttonText = "Got it, thanks!",
  buttonAction,
}) => {
  // const [copiedContent, setCopiedContent] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedAccounts, setSelectedAccounts] = useState<string[]>([]);
  const [aiDetectMode, setAiDetectMode] = useState(AiDetectionMode.TEXT);
  const {
    initialValues,
    errors,
    handleChange,
    resetForm,
    setFieldValue,
    values,
    handleSubmit,
  } = useFormik({
    initialValues: {
      aiDetect: "",
      category: "",
    },
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
    enableReinitialize: true,
  });

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
      // Further processing or upload the file here
      console.log("Uploaded image:", file);
    }
  };

  const pasteContent = () => {
    navigator.clipboard
      .readText()
      .then((text) => {
        console.log("Pasted content: ", text);
        setFieldValue("aiDetect", text);
        // setCopiedContent(text);
      })
      .catch((err) => {
        console.error("Failed to read clipboard contents: ", err);
      });
  };

  const handleChangeAiDetectMode = (mode: AiDetectionMode) => {
    setSelectedImage(null);
    // setCopiedContent("");
    setFieldValue("aiDetect", "");
    resetForm();
    setAiDetectMode(mode);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog
          open={isOpen}
          as="div"
          className="relative z-10 focus:outline-none"
          onClose={onClose}
        >
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="bg-black/50 fixed inset-0"
          />
          <motion.div
            key="modal"
            initial={{ y: "100%" }}
            animate={{ y: 0 }}
            exit={{ y: "100%" }}
            className="fixed bottom-0 z-10 w-screen max-h-screen overflow-auto"
          >
            <div className="flex min-h-full items-center justify-center">
              <DialogPanel className="w-full rounded-xl bg-zinc-900/70 p-6 backdrop-blur-3xl duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
                <DialogTitle
                  as="h3"
                  className="text-base/7 font-medium text-white"
                >
                  Enter Title
                </DialogTitle>
                <hr className="border-zinc-700" />
                {/* AI Section */}
                <div className="text-white my-4">✨ AI Detect ✨</div>
                <div className="border border-sky-700 p-4 rounded-lg overflow-hidden">
                  <div className="flex space-x-[-1px] rounded-lg border border-zinc-600">
                    <button
                      className={clsx(
                        "flex-1 px-4 py-2 text-white transition duration-150",
                        aiDetectMode === AiDetectionMode.TEXT &&
                          "bg-zinc-700 shadow-sm shadow-zinc-700/50 rounded-lg"
                      )}
                      onClick={() =>
                        handleChangeAiDetectMode(AiDetectionMode.TEXT)
                      }
                    >
                      Text detection
                    </button>
                    <button
                      className={clsx(
                        "flex-1 px-4 py-2 text-white transition duration-150",
                        aiDetectMode === AiDetectionMode.IMAGE &&
                          "bg-zinc-700 shadow-sm shadow-zinc-700/50 rounded-lg"
                      )}
                      onClick={() =>
                        handleChangeAiDetectMode(AiDetectionMode.IMAGE)
                      }
                    >
                      Image detection
                    </button>
                  </div>

                  {/* SMS pasting area */}
                  <AnimatePresence mode="wait">
                    {aiDetectMode === AiDetectionMode.TEXT && (
                      <motion.div
                        key="smsDetection"
                        initial={{ x: "-50%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "-100%" }}
                        transition={{ type: "just" }}
                        className="mt-2 flex-grow text-white/50 relative"
                      >
                        <TextArea
                          name="aiDetect"
                          placeholder="Paste SMS to detect"
                          value={values.aiDetect}
                          onChange={handleChange}
                          className="pb-[15px] -mb-[7px]" // Just to balance two inputs
                        />
                        <IconButton
                          icon={<ClipboardIcon className="size-5" />}
                          onClick={() => pasteContent()}
                          className="absolute top-1 right-1"
                        />
                        {values.aiDetect && (
                          <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            type="button"
                            className="w-full bg-green-600 mt-4 px-4 py-2 rounded-lg text-white"
                            onClick={() => alert("Not implemented yet!")}
                          >
                            Analyze text
                          </motion.button>
                        )}
                      </motion.div>
                    )}
                    {/* Camera button for image upload */}
                    {aiDetectMode === AiDetectionMode.IMAGE && (
                      <motion.div
                        key="imageDetection"
                        initial={{ x: "50%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "just" }}
                      >
                        {/* Conditionally render the upload button when no image is selected */}
                        {!selectedImage && (
                          <div className="relative text-center group mt-2 flex-col h-24 p-4 border border-dashed border-zinc-500 rounded-lg cursor-pointer">
                            <input
                              type="file"
                              accept="image/*"
                              className="absolute inset-0 opacity-0 cursor-pointer"
                              onChange={handleImageUpload}
                            />
                            <ArrowUpTrayIcon className="w-full size-6 text-zinc-400 group-hover:text-white" />
                            <div className="mt-2 text-sm text-zinc-400 group-hover:text-white">
                              Upload Image
                            </div>
                          </div>
                        )}

                        {/* Render the selected image and edit button when an image is uploaded */}
                        {selectedImage && (
                          <div className="mt-4 relative border border-dashed border-zinc-500 rounded-lg">
                            <img
                              src={URL.createObjectURL(selectedImage)}
                              alt="Selected"
                              className="w-full h-auto rounded-lg"
                            />
                            {/* Hidden input for uploading a new image when the edit button is clicked */}
                            <input
                              type="file"
                              accept="image/*"
                              ref={fileInputRef}
                              className="hidden"
                              onChange={handleImageUpload}
                            />
                            {/* Edit button */}
                            <IconButton
                              icon={
                                <PencilIcon className="w-6 h-6 text-white" />
                              }
                              className="absolute top-2 right-2 bg-black/50 p-2 rounded-full transition-all duration-200 hover:bg-black/70 hover:scale-110"
                              onClick={() => fileInputRef.current?.click()} // Simulate a click on the file input
                            />
                          </div>
                        )}
                        {selectedImage && (
                          <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            type="button"
                            className="w-full bg-green-600 mt-4 px-4 py-2 rounded-lg text-white"
                            onClick={() => alert("Not implemented yet!")}
                          >
                            Analyze Bill
                          </motion.button>
                        )}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <div className="flex items-center space-x-2">
                  <div className="text-white my-4 ">Category</div>{" "}
                  <div>
                    <IconButton
                      icon={<PlusCircleIcon className="size-5 text-white/50" />}
                      onClick={() => toast.success("Add new category")}
                      className="p-0 grid place-content-center"
                    />
                  </div>
                </div>
                <div className="grid grid-flow-col-dense grid-rows-2 gap-2 overflow-auto">
                  {CATEGORIES_HARD_CODED.map((category, index) => (
                    <MultiSelectableChip
                      key={index}
                      item={category}
                      selectedItems={selectedCategories}
                      handleSelectItem={(id: string) =>
                        handleSelect({
                          item: id,
                          setSelectedItems: setSelectedCategories,
                        })
                      }
                      className="text-xs transition duration-200 text-center content-center cursor-pointer text-white/50 border px-4 py-2 rounded-lg"
                    />
                  ))}
                </div>
                <div className="flex items-center space-x-2">
                  <div className="text-white my-4 ">Accounts</div>{" "}
                  <div>
                    <IconButton
                      icon={<PlusCircleIcon className="size-5 text-white/50" />}
                      onClick={() => toast.success("Add new Account")}
                      className="p-0 grid place-content-center"
                    />
                  </div>
                </div>
                <div className="grid grid-flow-col-dense grid-rows-2 gap-2 overflow-auto">
                  {ACCOUNTS_HARD_CODED.map((category, index) => (
                    <MultiSelectableChip
                      key={index}
                      item={category}
                      selectedItems={selectedAccounts}
                      handleSelectItem={(id: string) =>
                        handleSelect({
                          item: id,
                          setSelectedItems: setSelectedAccounts,
                          isMultiSelect: false,
                        })
                      }
                      className="text-xs transition duration-200 text-center content-center cursor-pointer text-white/50 border px-4 py-2 rounded-lg"
                    />
                  ))}
                </div>
                <button
                  onClick={() => handleSubmit()}
                  className="text-white/50 mt-4 bg-slate-600 px-4 py-2 rounded-lg w-full"
                >
                  Save
                </button>
              </DialogPanel>
            </div>
          </motion.div>
        </Dialog>
      )}
    </AnimatePresence>
  );
};

export default AddTransactionModal;
