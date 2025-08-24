import { useState, useMemo, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
  Users,
  UserCheck,
  UserX,
  MoreHorizontal,
  ChevronLeft,
  ChevronRight,
  Info,
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  useGetAllUserQuery,
  useSetAccountStatusMutation,
} from '@/redux/api/user.api';
import { toast } from 'sonner';

// Mock user data based on the provided structure
const mockUsers = [
  {
    _id: '688a387c01a606c167f4aae3',
    email: 'towhidkarim123@gmail.com',
    firstName: 'Towhid',
    lastName: 'Karim',
    phoneNumber: '01744161517',
    role: 'admin',
    createdAt: '2025-07-30T15:21:32.076Z',
    updatedAt: '2025-08-23T06:37:59.743Z',
    accountStatus: 'active',
  },
];

export default function ManageUsersPage() {
  const [users, setUsers] = useState(mockUsers);
  const [searchPhone, setSearchPhone] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [roleFilter, setRoleFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);

  const { data: userData } = useGetAllUserQuery(undefined);
  const [setAccountStatus] = useSetAccountStatusMutation();

  useEffect(() => {
    if (userData?.data) setUsers(userData.data);
  }, [userData?.data]);
  // Filter users based on search and filters
  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesPhone = user.phoneNumber.includes(searchPhone);
      const matchesStatus =
        statusFilter === 'all' || user.accountStatus === statusFilter;
      const matchesRole = roleFilter === 'all' || user.role === roleFilter;
      return matchesPhone && matchesStatus && matchesRole;
    });
  }, [users, searchPhone, statusFilter, roleFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Toggle user status
  const toggleUserStatus = async (
    phoneNumber: string,
    status: 'active' | 'inactive'
  ) => {
    // setUsers((prevUsers) =>
    //   prevUsers.map((user) =>
    //     user._id === userId
    //       ? {
    //           ...user,
    //           accountStatus:
    //             user.accountStatus === 'active' ? 'inactive' : 'active',
    //         }
    //       : user
    //   )
    // );
    toast.info('Setting Account status...');
    try {
      const res = await setAccountStatus({
        targetAccountPhoneNumber: phoneNumber,
        statusToSet: status,
      }).unwrap();
      if (res.data)
        toast.success('Status Set Succesfully!', {
          description: 'Refetching user data...',
        });
    } catch (error) {
      toast.error('Something went wrong!');
      console.error(error);
    }
  };

  // Get status badge variant
  const getStatusBadgeVariant = (status: string) => {
    return status === 'active' ? 'default' : 'secondary';
  };

  // Get role badge variant
  const getRoleBadgeVariant = (role: string) => {
    switch (role) {
      case 'admin':
        return 'destructive';
      case 'agent':
        return 'default';
      default:
        return 'outline';
    }
  };

  // Stats
  const totalUsers = users.length;
  const activeUsers = users.filter((u) => u.accountStatus === 'active').length;
  const inactiveUsers = users.filter(
    (u) => u.accountStatus === 'inactive'
  ).length;

  return (
    <div className='bg-background p-6 w-full min-h-screen'>
      <div className='space-y-6 mx-auto max-w-7xl'>
        {/* Header */}
        <div className='flex md:flex-row flex-col md:justify-between md:items-center gap-4'>
          <div>
            <h1 className='font-bold text-foreground text-3xl'>
              User Management
            </h1>
            <p className='text-muted-foreground'>
              Manage user accounts, roles, and status
            </p>
          </div>
        </div>

        {/* Stats Cards */}
        <div className='gap-4 grid md:grid-cols-3'>
          <Card>
            <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
              <CardTitle className='font-medium text-sm'>Total Users</CardTitle>
              <Users className='w-4 h-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='font-bold text-primary text-2xl'>
                {totalUsers}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
              <CardTitle className='font-mediumy text-sm'>
                Active Users
              </CardTitle>
              <UserCheck className='w-4 h-4 text-accent' />
            </CardHeader>
            <CardContent>
              <div className='font-bold text-primary text-2xl'>
                {activeUsers}
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
              <CardTitle className='font-medium text-sm'>
                Inactive Users
              </CardTitle>
              <UserX className='w-4 h-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='font-bold text-muted-foreground text-2xl'>
                {inactiveUsers}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Search */}
        <Card>
          <CardHeader>
            <CardTitle>User Directory</CardTitle>
            <CardDescription>
              Search and filter users by phone number, status, and role
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex md:flex-row flex-col md:items-center gap-4'>
              <div className='relative flex-1'>
                <Search className='top-1/2 left-3 absolute w-4 h-4 text-muted-foreground -translate-y-1/2' />
                <Input
                  placeholder='Search by phone number...'
                  value={searchPhone}
                  onChange={(e) => setSearchPhone(e.target.value)}
                  className='pl-10'
                />
              </div>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className='w-full md:w-[180px]'>
                  <SelectValue placeholder='Filter by status' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Status</SelectItem>
                  <SelectItem value='active'>Active</SelectItem>
                  <SelectItem value='inactive'>Inactive</SelectItem>
                </SelectContent>
              </Select>
              <Select value={roleFilter} onValueChange={setRoleFilter}>
                <SelectTrigger className='w-full md:w-[180px]'>
                  <SelectValue placeholder='Filter by role' />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value='all'>All Roles</SelectItem>
                  <SelectItem value='admin'>Admin</SelectItem>
                  <SelectItem value='agent'>Agent</SelectItem>
                  <SelectItem value='user'>User</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
        {/* Important alert  */}
        <Alert variant='default'>
          <Info />
          <AlertTitle>Note!</AlertTitle>
          <AlertDescription>
            You can deactivate/activate a user using the action control button
            (•••) resulting in blocking/unblocking that user respectively.
            Deactivated accounts can't operate their account
          </AlertDescription>
        </Alert>
        {/* Users Table */}
        <Card>
          <CardContent className='px-5'>
            <Table className='px-3 max-w-full'>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead>Role</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className='text-right'>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedUsers.length === 0 ? (
                  <TableRow>
                    <TableCell
                      colSpan={5}
                      className='py-8 text-muted-foreground text-center'
                    >
                      No users found matching your criteria
                    </TableCell>
                  </TableRow>
                ) : (
                  paginatedUsers.map((user) => (
                    <TableRow key={user._id} className='hover:bg-muted/50'>
                      <TableCell className='font-medium'>
                        <div className='flex flex-col'>
                          <span>
                            {user.firstName} {user.lastName}
                          </span>
                          <span className='text-muted-foreground text-sm'>
                            {user.email}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{user.phoneNumber}</TableCell>
                      <TableCell>
                        <Badge
                          variant={getRoleBadgeVariant(user.role)}
                          className='capitalize'
                        >
                          {user.role}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={getStatusBadgeVariant(user.accountStatus)}
                          className='capitalize'
                        >
                          {user.accountStatus}
                        </Badge>
                      </TableCell>
                      <TableCell className='text-right'>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant='ghost' className='p-0 w-8 h-8'>
                              <MoreHorizontal className='w-4 h-4' />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align='end'>
                            <DropdownMenuItem
                              onClick={() =>
                                toggleUserStatus(
                                  user.phoneNumber,
                                  user.accountStatus === 'active'
                                    ? 'inactive'
                                    : 'active'
                                )
                              }
                              className='cursor-pointer'
                            >
                              {user.accountStatus === 'active'
                                ? 'Deactivate'
                                : 'Activate'}{' '}
                              User
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>

        {/* Pagination */}
        {totalPages > 1 && (
          <Card>
            <CardContent className='flex justify-between items-center p-4'>
              <div className='text-muted-foreground text-sm'>
                Showing {startIndex + 1} to{' '}
                {Math.min(startIndex + itemsPerPage, filteredUsers.length)} of{' '}
                {filteredUsers.length} users
              </div>
              <div className='flex items-center gap-2'>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() =>
                    setCurrentPage((prev) => Math.max(prev - 1, 1))
                  }
                  disabled={currentPage === 1}
                >
                  <ChevronLeft className='w-4 h-4' />
                  Previous
                </Button>
                <div className='flex items-center gap-1'>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                    (page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? 'default' : 'outline'}
                        size='sm'
                        onClick={() => setCurrentPage(page)}
                        className='p-0 w-8 h-8'
                      >
                        {page}
                      </Button>
                    )
                  )}
                </div>
                <Button
                  variant='outline'
                  size='sm'
                  onClick={() =>
                    setCurrentPage((prev) => Math.min(prev + 1, totalPages))
                  }
                  disabled={currentPage === totalPages}
                >
                  Next
                  <ChevronRight className='w-4 h-4' />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
