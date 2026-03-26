import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from "@types";
import { usePage, router } from "@inertiajs/react";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Button } from "@headlessui/react";

interface Course {
    course_id: number;
    tenant_id: number;
    course_name: string;
    teacher_id: number;
}

interface Teacher {
    teacher_id: number;
    first_name: string;
    last_name: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: "Courses", href: "/courses" },
];

const emptyForm = { course_name: "", teacher_id: "" };
type FormState = typeof emptyForm & { id?: number };

export default function CourseIndex() {
    const { courses, teachers } = usePage<{ courses?: Course[]; teachers?: Teacher[] }>().props;

    const courseList = courses ?? [];
    const teacherList = teachers ?? [];

    const [open, setOpen] = useState(false);
    const [form, setForm] = useState<FormState>(emptyForm);
    const [isEdit, setIsEdit] = useState(false);

    const handleOpenAdd = () => {
        setForm(emptyForm);
        setIsEdit(false);
        setOpen(true);
    };

    const handleOpenEdit = (course: Course) => {
        setForm({
            id: course.course_id,
            course_name: course.course_name,
            teacher_id: String(course.teacher_id),
        });
        setIsEdit(true);
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
        setForm(emptyForm);
        setIsEdit(false);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            ...form,
            teacher_id: Number(form.teacher_id),
        };

        if (isEdit && form.id) {
            router.put(`/courses/${form.id}`, payload, {
                onSuccess: handleClose,
            });
        } else {
            router.post("/courses", payload, {
                onSuccess: handleClose,
            });
        }
    };

    const handleDelete = (id: number) => {
        if (window.confirm("Are you sure?")) {
            router.delete(`/courses/${id}`);
        }
    };

    const getTeacherName = (teacher_id: number) => {
        const teacher = teacherList.find(t => t.teacher_id === teacher_id);
        return teacher ? `${teacher.first_name} ${teacher.last_name}` : "Unknown";
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Card className="p-6 mt-6">
                <div className="flex justify-between mb-4">
                    <h1 className="text-xl font-bold">Courses</h1>
                    <Button onClick={handleOpenAdd}>Add Course</Button>
                </div>

                <table className="w-full border">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Teacher</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courseList.map(course => (
                            <tr key={course.course_id}>
                                <td>{course.course_id}</td>
                                <td>{course.course_name}</td>
                                <td>{getTeacherName(course.teacher_id)}</td>
                                <td>
                                    <Button onClick={() => handleOpenEdit(course)}>Edit</Button>
                                    <Button onClick={() => handleDelete(course.course_id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {isEdit ? "Update Course" : "Add Course"}
                        </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <Label>Course Name</Label>
                            <Input
                                name="course_name"
                                value={form.course_name}
                                onChange={handleChange}
                            />
                        </div>

                        <div>
                            <Label>Teacher</Label>
                            <select
                                name="teacher_id"
                                value={form.teacher_id}
                                onChange={handleChange}
                                className="border w-full p-2"
                            >
                                <option value="">Select Teacher</option>
                                {teacherList.map(t => (
                                    <option key={t.teacher_id} value={t.teacher_id}>
                                        {t.first_name} {t.last_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="flex gap-2 justify-end">
                            <Button type="button" onClick={handleClose}>Cancel</Button>
                            <Button type="submit">
                                {isEdit ? "Update" : "Add"}
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}