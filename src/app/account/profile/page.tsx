import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";
import { ProfileForm } from "@/components/account/profile-form";

export default async function ProfilePage() {
  const user = await getCurrentUser();
  if (!user) redirect("/login");
  return (
    <div>
      <h1 className="text-3xl font-semibold">Профиль</h1>
      <ProfileForm name={user.name || ""} email={user.email} />
    </div>
  );
}
