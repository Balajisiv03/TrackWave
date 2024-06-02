"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useForm } from "react-hook-form";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import GlobalApi from "@/app/_services/GlobalApi";
import { toast } from "sonner";
import { LoaderIcon } from "lucide-react";

const AddNewStudents = ({ refreshData }) => {
  const [open, setOpen] = useState(false);
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    GetAllGradesList();
  }, []);

  const GetAllGradesList = () => {
    GlobalApi.GetAllGrades().then((resp) => {
      setGrades(resp.data);
    });
  };

  const onSubmit = (data) => {
    console.log("formdata", data);
    setLoading(true);
    GlobalApi.CreateNewStudent(data).then((resp) => {
      console.log("--", resp);
      if (resp.data) {
        reset();
        refreshData();
        setOpen(false);
        toast("New sudent added!");
      }
      setLoading(false);
    });
  };
  return (
    <div>
      <Button onClick={() => setOpen(true)}>+ Add New Student </Button>
      <Dialog open={open}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add New Student</DialogTitle>
            <DialogDescription>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className="py-2">
                  <label>Full Name</label>
                  <Input
                    placeholder="Ex. Pranav kumar"
                    {...register("name", { required: true })}
                  />
                </div>
                <div className="py-3 flex flex-col">
                  <label>Select Grade</label>
                  <select
                    className="p-3 border rounded-lg"
                    {...register("grade", { required: true })}
                  >
                    {grades.map((item, index) => (
                      <option key={index} value={item.grade}>
                        {item.grade}
                      </option>
                    ))}
                  </select>
                </div>
                <div className="py-2">
                  <label>Contact Number</label>
                  <Input
                    type="number"
                    placeholder="Ex. 9876543234"
                    {...register("contact")}
                  />
                </div>
                <div className="py-2">
                  <label>Address</label>
                  <Input
                    placeholder="Ex. No 3B,4th sent street"
                    {...register("address")}
                  />
                </div>
                <div className="flex gap-3 items-center justify-end mt-5">
                  <Button
                    type="button"
                    onClick={() => setOpen(false)}
                    variant="ghost"
                  >
                    Cancel
                  </Button>
                  <Button type="submit" disable={loading}>
                    {loading ? <LoaderIcon className="animate-spin" /> : "Save"}
                  </Button>
                </div>
              </form>
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AddNewStudents;
