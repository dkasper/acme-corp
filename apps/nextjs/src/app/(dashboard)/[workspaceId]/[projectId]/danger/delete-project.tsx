"use client";

import { Button } from "@acme/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@acme/ui/card";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@acme/ui/dialog";
import { Icons } from "@acme/ui/icons";
import { useToast } from "@acme/ui/use-toast";
import { useRouter } from "next/navigation";

import { api } from "~/trpc/client";

export function DeleteProject(props: { projectId: string }) {
  const toaster = useToast();
  const router = useRouter();

  const title = "Delete project";
  const description = "This will delete the project and all of its data.";

  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription className="flex items-center">
          {description}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex justify-between">
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="destructive">{title}</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{title}</DialogTitle>
              <DialogDescription>{description}</DialogDescription>
            </DialogHeader>
            <div className="flex items-center font-bold text-destructive">
              <Icons.warning className="mr-2 h-6 w-6" />
              <p>This action can not be reverted</p>
            </div>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="secondary">Cancel</Button>
              </DialogClose>
              <Button
                variant="destructive"
                onClick={async () => {
                  try {
                    await api.project.delete.mutate({
                      id: props.projectId,
                    });
                    toaster.toast({ title: "Project deleted" });
                    router.push(`/dashboard`);
                  } catch {
                    toaster.toast({
                      title: "Project could not be deleted",
                      variant: "destructive",
                    });
                  }
                }}
              >
                {`I'm sure. Delete this project`}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
