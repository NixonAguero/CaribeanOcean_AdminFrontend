import { useEffect, useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
} from 'recharts';
import { useRevenue } from '../hooks/useRevenue';
import type { DateRangeParams } from '../types/revenue';
import styles from '../styles/dashboard.module.css';
import { Spinner } from '../../../shared/components/Spinner/Spinner';

const ROOM_TYPE_COLORS = ['#1D9E75', '#D85A30', '#C9B878', '#0C3D52', '#6B4C9A'];
const MONTH_FORMATTER = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
});

function getDefaultDates(): DateRangeParams {
  const today = new Date().toISOString().split('T')[0];
  const yearStart = `${new Date().getFullYear()}-01-01`;
  return { date_from: yearStart, date_to: today };
}

function formatCurrency(value: number | string): string {
  const amount = Number(value);

  if (Number.isNaN(amount)) {
    return '$0';
  }

  return `$${amount.toLocaleString()}`;
}

function chartTooltipFormatter(value: number | string) {
  return [formatCurrency(value), 'Revenue'] as [string, string];
}

function formatMonthLabel(year: number, month: number, fallback: string): string {
  if (!year || !month) {
    return fallback;
  }

  return MONTH_FORMATTER.format(new Date(year, month - 1, 1));
}

function normalizeOfferName(name: string): string {
  return name.trim().toLowerCase() === 'sin oferta' ? 'No offer' : name;
}

type ChartCardProps = {
  title: string;
  isEmpty: boolean;
  children: React.ReactNode;
};

function ChartCard({ title, isEmpty, children }: ChartCardProps) {
  return (
    <section className={styles.chartCard}>
      <h3 className={styles.chartTitle}>{title}</h3>
      <div className={styles.chartCanvas}>
        {isEmpty ? (
          <div className={styles.emptyChart}>No data available for this date range.</div>
        ) : (
          children
        )}
      </div>
    </section>
  );
}

export default function Dashboard() {
  const [dateRange, setDateRange] = useState<DateRangeParams>(getDefaultDates);
  const { kpis, byMonth, byRoomType, byOffer, loading, error, fetchAll } = useRevenue();

  useEffect(() => {
    fetchAll(dateRange);
  }, [fetchAll]);

  const handleFilter = () => {
    fetchAll(dateRange);
  };

  if (loading || !kpis) {
    return <Spinner centered size="lg" message="Loading revenue data..." />;
  }

  if (error) {
    return (
      <div className="admin-content">
        <div className="admin-content__inner">
          <p className={styles.errorMessage}>Unable to load revenue data: {error}</p>
        </div>
      </div>
    );
  }

  const kpiCards = [
    { label: 'Total revenue', value: formatCurrency(kpis.total_revenue), accent: 'revenue' },
    { label: 'Average night price', value: formatCurrency(kpis.avg_night_price), accent: 'night' },
    { label: 'Reservations', value: kpis.total_reservations.toLocaleString(), accent: 'reservations' },
    {
      label: 'Revenue per reservation',
      value: formatCurrency(kpis.avg_revenue_per_reservation),
      accent: 'average',
    },
  ];
  const byMonthData = byMonth.map((item) => ({
    ...item,
    month_label: formatMonthLabel(item.year, item.month, item.month_label),
  }));
  const byOfferData = byOffer.map((item) => ({
    ...item,
    offer_name: normalizeOfferName(item.offer_name),
  }));

  return (
    <div className="admin-content">
      <div className="admin-content__inner">
        <header className={`page-header ${styles.header}`}>
          <div>
            <h1 className="page-header__title">Revenue Dashboard</h1>
            <p className="page-header__subtitle">
              Monitor booking revenue, averages, and performance by room type and offer.
            </p>
          </div>
        </header>

        <hr className="page-header__divider" />

        <section className={styles.filterBar} aria-label="Revenue date filters">
          <label className={styles.field}>
            <span>Start date</span>
            <input
              type="date"
              value={dateRange.date_from}
              onChange={(event) =>
                setDateRange((prev) => ({ ...prev, date_from: event.target.value }))
              }
            />
          </label>

          <label className={styles.field}>
            <span>End date</span>
            <input
              type="date"
              value={dateRange.date_to}
              onChange={(event) =>
                setDateRange((prev) => ({ ...prev, date_to: event.target.value }))
              }
            />
          </label>

          <button type="button" className="btn-primary" onClick={handleFilter}>
            Apply filters
          </button>
        </section>

        <section className={styles.kpiGrid} aria-label="Revenue key performance indicators">
          {kpiCards.map(({ label, value, accent }) => (
            <article key={label} className={styles.kpiCard} data-accent={accent}>
              <p className={styles.kpiLabel}>{label}</p>
              <p className={styles.kpiValue}>{value}</p>
            </article>
          ))}
        </section>

        <section className={styles.chartGrid} aria-label="Revenue charts">
          <ChartCard title="Revenue by Month" isEmpty={byMonthData.length === 0}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byMonthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E9DFD2" />
                <XAxis dataKey="month_label" tick={{ fontSize: 11, fill: '#6B6B6B' }} />
                <YAxis
                  tickFormatter={(value) => `$${(Number(value) / 1000).toFixed(0)}k`}
                  tick={{ fontSize: 11, fill: '#6B6B6B' }}
                />
                <Tooltip formatter={chartTooltipFormatter} />
                <Bar dataKey="total" fill="#1D9E75" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Revenue by Room Type" isEmpty={byRoomType.length === 0}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byRoomType} layout="vertical" margin={{ left: 80 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E9DFD2" />
                <XAxis
                  type="number"
                  tickFormatter={(value) => `$${(Number(value) / 1000).toFixed(0)}k`}
                  tick={{ fontSize: 11, fill: '#6B6B6B' }}
                />
                <YAxis
                  type="category"
                  dataKey="room_type"
                  tick={{ fontSize: 11, fill: '#6B6B6B' }}
                  width={120}
                />
                <Tooltip formatter={chartTooltipFormatter} />
                <Bar dataKey="total" radius={[0, 4, 4, 0]}>
                  {byRoomType.map((_, index) => (
                    <Cell key={index} fill={ROOM_TYPE_COLORS[index % ROOM_TYPE_COLORS.length]} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Revenue by Offer" isEmpty={byOfferData.length === 0}>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={byOfferData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E9DFD2" />
                <XAxis dataKey="offer_name" tick={{ fontSize: 11, fill: '#6B6B6B' }} />
                <YAxis
                  tickFormatter={(value) => `$${(Number(value) / 1000).toFixed(0)}k`}
                  tick={{ fontSize: 11, fill: '#6B6B6B' }}
                />
                <Tooltip formatter={chartTooltipFormatter} />
                <Bar dataKey="total" fill="#D85A30" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Revenue Trend" isEmpty={byMonthData.length === 0}>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={byMonthData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E9DFD2" />
                <XAxis dataKey="month_label" tick={{ fontSize: 11, fill: '#6B6B6B' }} />
                <YAxis
                  tickFormatter={(value) => `$${(Number(value) / 1000).toFixed(0)}k`}
                  tick={{ fontSize: 11, fill: '#6B6B6B' }}
                />
                <Tooltip formatter={chartTooltipFormatter} />
                <Line
                  type="monotone"
                  dataKey="total"
                  stroke="#0C3D52"
                  strokeWidth={2}
                  dot={{ r: 4, fill: '#1D9E75', stroke: '#0C3D52', strokeWidth: 2 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </section>
      </div>
    </div>
  );
}
