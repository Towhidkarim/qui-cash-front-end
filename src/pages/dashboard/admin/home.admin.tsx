import { useState, useEffect } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import {
  Users,
  UserCheck,
  CreditCard,
  DollarSign,
  TrendingUp,
  Activity,
  Shield,
} from 'lucide-react';
import { useGetAllUserQuery } from '@/redux/api/user.api';
import { useGetAllTransactionsQuery } from '@/redux/api/transaction.api';
import { generateDashboardData } from '@/lib/utils';

// Mock data for admin dashboard
// const overviewData = {
//   totalUsers: 12847,
//   totalAgents: 342,
//   transactionCount: 45623,
//   transactionVolume: 2847392.5,
// };

const transactionTrendsDef = [
  { day: 'Jan', transactions: 0, volume: 0 },
  { day: 'Feb', transactions: 0, volume: 0 },
  { day: 'Mar', transactions: 0, volume: 0 },
  { day: 'Apr', transactions: 0, volume: 0 },
  { day: 'May', transactions: 0, volume: 0 },
  { day: 'Jun', transactions: 0, volume: 0 },
];

const userDistributionDef = [
  { type: 'User', count: 150, percentage: 76.6 },
  { type: 'Agent', count: 15, percentage: 20.7 },
  { type: 'Other', count: 5, percentage: 2.7 },
];

const agentPerformance = [
  { name: 'Top Performers', count: 89, color: '#0369a1' }, // sky-700
  { name: 'Active', count: 198, color: '#15803d' }, // green-700
  { name: 'Inactive', count: 55, color: '#b91c1c' }, // red-700
];

const transactionChartConfig = {
  transactions: {
    label: 'Transactions',
    color: '#0369a1', // sky-700
  },
  volume: {
    label: 'Volume ($)',
    color: '#15803d', // green-700
  },
};

const userDistributionConfig = {
  personal: {
    label: 'Personal',
    color: '#0369a1', // sky-700
  },
  agent: {
    label: 'Agent',
    color: '#7c2d12', // orange-900
  },
  business: {
    label: 'Business',
    color: '#4338ca', // indigo-700
  },
};

const agentPerformanceConfig = {
  count: {
    label: 'Agents',
    colors: ['#0369a1', '#15803d', '#b91c1c'], // sky-700, green-700, red-700
  },
};

export default function AdminDashboard() {
  const [animatedValues, setAnimatedValues] = useState({
    totalUsers: 0,
    totalAgents: 0,
    transactionCount: 0,
    transactionVolume: 0,
  });

  const [transactionTrends, setTransactionTrends] =
    useState(transactionTrendsDef);
  const [userDistribution, setUserDistribution] = useState(userDistributionDef);

  const { data: userData } = useGetAllUserQuery(undefined);
  const { data: transactionData } = useGetAllTransactionsQuery(undefined);

  useEffect(() => {
    const duration = 1000;
    const steps = 30;
    const stepDuration = duration / steps;

    let currentStep = 0;
    const timer = setInterval(() => {
      currentStep++;
      const progress = currentStep / steps;

      if (userData?.data && transactionData?.data) {
        const { overviewData, transactionTrends, userDistribution } =
          generateDashboardData(userData.data, transactionData.data);
        setTransactionTrends(transactionTrends);
        setUserDistribution(userDistribution);
        setAnimatedValues({
          totalUsers: Math.floor(overviewData.totalUsers * progress),
          totalAgents: Math.floor(overviewData.totalAgents * progress),
          transactionCount: Math.floor(
            overviewData.transactionCount * progress
          ),
          transactionVolume: overviewData.transactionVolume * progress,
        });
        if (currentStep >= steps) {
          clearInterval(timer);
          setAnimatedValues(overviewData);
        }
      }
    }, stepDuration);

    return () => clearInterval(timer);
  }, [userData, transactionData]);

  return (
    <div className='p-6 min-h-screen'>
      <div className='space-y-8 mx-auto max-w-7xl'>
        <div className='flex justify-between items-center'>
          <div>
            <h1 className='font-bold text-primary text-3xl'>Admin Dashboard</h1>
            <p className='mt-1 text-muted-foreground'>
              Monitor platform performance and user activity
            </p>
          </div>
          <Badge
            variant='outline'
            className='bg-primary/10 border-sky-700/20 text-primary'
          >
            <Activity className='mr-1 w-4 h-4' />
            Live Data
          </Badge>
        </div>

        <div className='gap-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4'>
          <Card className='hover:shadow-lg border-sky-700/20 transition-shadow'>
            <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
              <CardTitle className='font-medium text-primary text-sm'>
                Total Users
              </CardTitle>
              <Users className='w-4 h-4 text-primary/80' />
            </CardHeader>
            <CardContent>
              <div className='font-bold text-sky-900 text-2xl'>
                {animatedValues.totalUsers.toLocaleString()}
              </div>
              <div className='flex items-center mt-1 text-emerald-600 text-xs'>
                <TrendingUp className='mr-1 w-3 h-3' />
                +12.5% from last month
              </div>
            </CardContent>
          </Card>

          <Card className='hover:shadow-lg border-sky-100 transition-shadow'>
            <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
              <CardTitle className='font-medium text-sm'>
                Total Agents
              </CardTitle>
              <UserCheck className='w-4 h-4 text-sky-600' />
            </CardHeader>
            <CardContent>
              <div className='font-bold text-sky-900 text-2xl'>
                {animatedValues.totalAgents.toLocaleString()}
              </div>
              <div className='flex items-center mt-1 text-emerald-600 text-xs'>
                <TrendingUp className='mr-1 w-3 h-3' />
                +8.2% from last month
              </div>
            </CardContent>
          </Card>

          <Card className='hover:shadow-lg border-sky-100 transition-shadow'>
            <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
              <CardTitle className='font-medium text-sm'>
                Transaction Count
              </CardTitle>
              <CreditCard className='w-4 h-4 text-sky-600' />
            </CardHeader>
            <CardContent>
              <div className='font-bold text-sky-900 text-2xl'>
                {animatedValues.transactionCount.toLocaleString()}
              </div>
              <div className='flex items-center mt-1 text-emerald-600 text-xs'>
                <TrendingUp className='mr-1 w-3 h-3' />
                +15.3% from last month
              </div>
            </CardContent>
          </Card>

          <Card className='hover:shadow-lg border-sky-100 transition-shadow'>
            <CardHeader className='flex flex-row justify-between items-center space-y-0 pb-2'>
              <CardTitle className='font-medium text-sm'>
                Transaction Volume
              </CardTitle>
              <DollarSign className='w-4 h-4 text-sky-600' />
            </CardHeader>
            <CardContent>
              <div className='font-bold text-sky-900 text-2xl'>
                TK&nbsp;
                {animatedValues.transactionVolume.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })}
              </div>
              <div className='flex items-center mt-1 text-emerald-600 text-xs'>
                <TrendingUp className='mr-1 w-3 h-3' />
                +18.7% from last month
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts Section */}
        <div className='gap-6 grid grid-cols-1 lg:grid-cols-2'>
          {/* Transaction Trends */}
          <Card className='border-sky-500/20'>
            <CardHeader>
              <CardTitle className='text-primary'>Transaction Trends</CardTitle>
              <CardDescription className='text-muted-foreground'>
                Monthly transaction count and volume over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={transactionChartConfig} className='h-80'>
                <ResponsiveContainer width='100%' height='100%'>
                  <LineChart data={transactionTrends}>
                    <CartesianGrid
                      strokeDasharray='3 3'
                      stroke='hsl(var(--border))'
                    />
                    <XAxis
                      dataKey='month'
                      stroke='hsl(var(--muted-foreground))'
                      fontSize={12}
                    />
                    <YAxis
                      stroke='hsl(var(--muted-foreground))'
                      fontSize={12}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Line
                      type='monotone'
                      dataKey='transactions'
                      stroke={transactionChartConfig.transactions.color}
                      strokeWidth={2}
                      name='Transactions'
                    />
                    <Line
                      type='monotone'
                      dataKey='volume'
                      stroke={transactionChartConfig.volume.color}
                      strokeWidth={2}
                      name='Volume'
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* User Distribution */}
          <Card className='border-sky-100'>
            <CardHeader>
              <CardTitle className='text-primary'>User Distribution</CardTitle>
              <CardDescription className='text-muted-foreground'>
                Breakdown of user types on the platform
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={userDistributionConfig} className='h-80'>
                <ResponsiveContainer width='100%' height='100%'>
                  <BarChart data={userDistribution}>
                    <CartesianGrid
                      strokeDasharray='3 3'
                      stroke='hsl(var(--border))'
                    />
                    <XAxis
                      dataKey='type'
                      stroke='hsl(var(--muted-foreground))'
                      fontSize={12}
                    />
                    <YAxis
                      stroke='hsl(var(--muted-foreground))'
                      fontSize={12}
                    />
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Bar dataKey='count' radius={[4, 4, 0, 0]}>
                      {userDistribution.map((_entry, index) => (
                        <Cell
                          key={`cell-${index}`}
                          fill={
                            Object.values(userDistributionConfig)[index].color
                          }
                        />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>
        </div>

        {/* Agent Performance and System Status */}
        <div className='gap-6 grid grid-cols-1 lg:grid-cols-3'>
          {/* Agent Performance */}
          <Card className='lg:col-span-2 border-sky-100'>
            <CardHeader>
              <CardTitle className='text-primary'>Agent Performance</CardTitle>
              <CardDescription className='text-muted-foreground'>
                Current status of all registered agents
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ChartContainer config={agentPerformanceConfig} className='h-64'>
                <ResponsiveContainer width='100%' height='100%'>
                  <PieChart>
                    <Pie
                      data={agentPerformance}
                      cx='50%'
                      cy='50%'
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey='count'
                    >
                      {agentPerformance.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <ChartTooltip content={<ChartTooltipContent />} />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card className='border-sky-100'>
            <CardHeader>
              <CardTitle className='text-primary'>System Status</CardTitle>
              <CardDescription className='text-muted-foreground'>
                Platform health and performance
              </CardDescription>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <div className='flex justify-between items-center'>
                  <span className='font-medium text-primary text-sm'>
                    Server Uptime
                  </span>
                  <span className='text-emerald-600 text-sm'>99.9%</span>
                </div>
                <Progress value={99.9} className='' />
              </div>

              <div className='space-y-2'>
                <div className='flex justify-between items-center'>
                  <span className='font-medium text-sky-700 text-sm'>
                    API Response
                  </span>
                  <span className='text-emerald-600 text-sm'>98.5%</span>
                </div>
                <Progress value={98.5} className='h-2' />
              </div>

              <div className='space-y-2'>
                <div className='flex justify-between items-center'>
                  <span className='font-medium text-sky-700 text-sm'>
                    Database Health
                  </span>
                  <span className='text-emerald-600 text-sm'>100%</span>
                </div>
                <Progress value={100} className='h-2' />
              </div>

              <div className='pt-4 border-sky-100 border-t'>
                <div className='flex items-center text-muted-foreground text-sm'>
                  <Shield className='mr-2 w-4 h-4 text-primary' />
                  All systems operational
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
