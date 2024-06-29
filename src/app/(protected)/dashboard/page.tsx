import { DataTable } from "@components/Table/DataTable";
import {
  User,
  columns,
} from "@app/(protected)/dashboard/Components/OverviewColumns";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

async function getUsers(): Promise<User[]> {
  const res = await fetch(
    "https://64a6f5fc096b3f0fcc80e3fa.mockapi.io/api/users"
  );
  const data = await res.json();
  return data;
}

export default async function page() {
  const data = await getUsers();

  return (
    <div className="flex min-h-screen w-full flex-col overflow-hidden px-4 pb-4 sm:px-2 sm:pb-2">
      <Breadcrumb className="my-3">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink className="font-medium" href="/">
              Home
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink className="font-medium" href="/dashboard">
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <DataTable
        columns={columns}
        data={data}
        isPaginationEnabled={true}
        defaultPageSize={5}
      />
    </div>
  );
}
