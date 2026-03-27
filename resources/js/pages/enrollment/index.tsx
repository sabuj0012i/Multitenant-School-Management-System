import AppLayout from "@/layouts/app-layout";
import { type BreadcrumbItem } from '@/types';
import { usePage, router } from '@inertiajs/react';
import { Card } from '@/components/ui/card';
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from "@/components/ui/input";
import { Label } from '@/components/ui/label';
import { useState } from "react";

interface Enrollment {
    enrollment_id: number;
    tenant_id: number;
    student_id: number;
    course_id: number;
    enrollment_date: string;
}

interface Student {
    student_id: number;
    first_name: string;
    last_name: string;
}

interface Course {
    course_id: number;
    course_name: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Enrollments', href: '/enrollments' }
];

const emptyForm = { student_id: '', course_id: '', enrollment_date: '' };
type FormState = typeof emptyForm & { id?: number };

export default function EnrollmentIndex() {
    const { enrollments, students, courses } = usePage<{
        enrollments?: Enrollment[];
        students?: Student[];
        courses?: Course[];
    }>().props;

    const enrollmentList = enrollments ?? [];
    const studentList = students ?? [];
    const courseList = courses ?? [];

    const [open, setOpen] = useState(false);
    const [form, setForm] = useState<FormState>(emptyForm);
    const [isEdit, setIsEdit] = useState(false);

    const handleOpenAdd = () => {
        setForm(emptyForm);
        setIsEdit(false);
        setOpen(true);
    };

    const handleOpenEdit = (enrollment: Enrollment) => {
        setForm({
            id: enrollment.enrollment_id,
            student_id: String(enrollment.student_id),
            course_id: String(enrollment.course_id),
            enrollment_date: enrollment.enrollment_date,
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
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const payload = {
            student_id: Number(form.student_id),
            course_id: Number(form.course_id),
            enrollment_date: form.enrollment_date,
        };

        if (isEdit && form.id) {
            router.put(`/enrollments/${form.id}`, payload, {
                onSuccess: handleClose,
            });
        } else {
            router.post('/enrollments', payload, {
                onSuccess: handleClose,
            });
        }
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure?')) {
            router.delete(`/enrollments/${id}`);
        }
    };

    const getStudentName = (id: number) => {
        const s = studentList.find(st => st.student_id === id);
        return s ? `${s.first_name} ${s.last_name}` : id;
    };

    const getCourseName = (id: number) => {
        const c = courseList.find(cs => cs.course_id === id);
        return c ? c.course_name : id;
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Card className="p-6 mt-6">

                <div className="flex justify-between mb-4">
                    <h1 className="text-2xl font-bold">Enrollments</h1>
                    <Button onClick={handleOpenAdd}>Add Enrollment</Button>
                </div>

                <div className="overflow-x-auto">
                    <table className="min-w-full border text-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Student</th>
                                <th>Course</th>
                                <th>Date</th>
                                <th>Actions</th>
                            </tr>
                        </thead>

                        <tbody>
                            {enrollmentList.map((enrollment) => (
                                <tr key={enrollment.enrollment_id}>
                                    <td>{enrollment.enrollment_id}</td>
                                    <td>{getStudentName(enrollment.student_id)}</td>
                                    <td>{getCourseName(enrollment.course_id)}</td>
                                    <td>{enrollment.enrollment_date}</td>
                                    <td className="flex gap-2">
                                        <Button size="sm" onClick={() => handleOpenEdit(enrollment)}>Edit</Button>
                                        <Button size="sm" variant="destructive"
                                            onClick={() => handleDelete(enrollment.enrollment_id)}>
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

            </Card>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {isEdit ? 'Update Enrollment' : 'Add Enrollment'}
                        </DialogTitle>
                    </DialogHeader>

                    <form onSubmit={handleSubmit} className="space-y-4">

                        {/* Student */}
                        <div>
                            <Label>Student</Label>
                            <select
                                name="student_id"
                                value={form.student_id}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                                required
                            >
                                <option value="">Select student</option>
                                {studentList.map(s => (
                                    <option key={s.student_id} value={s.student_id}>
                                        {s.first_name} {s.last_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Course */}
                        <div>
                            <Label>Course</Label>
                            <select
                                name="course_id"
                                value={form.course_id}
                                onChange={handleChange}
                                className="w-full border p-2 rounded"
                                required
                            >
                                <option value="">Select course</option>
                                {courseList.map(c => (
                                    <option key={c.course_id} value={c.course_id}>
                                        {c.course_name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        {/* Date */}
                        <div>
                            <Label>Enrollment Date</Label>
                            <Input
                                type="date"
                                name="enrollment_date"
                                value={form.enrollment_date}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        <div className="flex justify-end gap-2">
                            <Button type="button" variant="outline" onClick={handleClose}>Cancel</Button>
                            <Button type="submit">{isEdit ? 'Update' : 'Add'}</Button>
                        </div>

                    </form>
                </DialogContent>
            </Dialog>
        </AppLayout>
    );
}