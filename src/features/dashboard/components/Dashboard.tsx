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
  Legend,
} from 'recharts';
import { useRevenue } from '../hooks/useRevenue';
import { useOccupancyDashboard } from '../hooks/useOccupancyDashboard';
import type { DateRangeParams } from '../types/revenue';
import type { OccupancyDashboardData } from '../types/occupancy';
import styles from '../styles/dashboard.module.css';
import { Spinner } from '../../../shared/components/Spinner/Spinner';

const FORECAST_DAYS = 30;
const ROOM_TYPE_COLORS = ['#1D9E75', '#D85A30', '#C9B878', '#0C3D52', '#6B4C9A'];
const MONTH_FORMATTER = new Intl.DateTimeFormat('en-US', {
  month: 'short',
  year: 'numeric',
});
const DATE_LABEL_FORMATTER = new Intl.DateTimeFormat('es-CR', {
  day: '2-digit',
  month: 'short',
});
const DATE_CARD_FORMATTER = new Intl.DateTimeFormat('es-CR', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
});
const PERCENT_FORMATTER = new Intl.NumberFormat('en-US', {
  maximumFractionDigits: 1,
});

function formatInputDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}

function getDefaultDates(): DateRangeParams {
  const currentDate = new Date();
  const today = formatInputDate(currentDate);
  const yearStart = `${currentDate.getFullYear()}-01-01`;

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

type OccupancyChartPoint = {
  date: string;
  occupancy_rate: number | null;
  predicted_occupancy_rate: number | null;
  confidence: number | null;
};

type OccupancyTooltipItem = {
  dataKey?: string | number;
  name?: string | number;
  value?: number | string | null;
  color?: string;
  payload?: OccupancyChartPoint;
};

type OccupancyTooltipProps = {
  active?: boolean;
  label?: string | number;
  payload?: OccupancyTooltipItem[];
};

function normalizeRate(value: number | string | null | undefined): number | null {
  const rate = Number(value);

  if (!Number.isFinite(rate)) {
    return null;
  }

  return rate >= 0 && rate <= 1 ? rate * 100 : rate;
}

function formatPercentage(value: number | string | null | undefined): string {
  const percentage = Number(value);

  if (!Number.isFinite(percentage)) {
    return 'N/A';
  }

  return `${PERCENT_FORMATTER.format(percentage)}%`;
}

function formatRate(value: number | string | null | undefined): string {
  return formatPercentage(normalizeRate(value));
}

function parseDateValue(value: string): Date | null {
  if (!value) {
    return null;
  }

  const normalizedValue = value.includes('T') ? value : `${value}T00:00:00`;
  const date = new Date(normalizedValue);

  return Number.isNaN(date.getTime()) ? null : date;
}

function formatShortDateLabel(value: string | number): string {
  const date = parseDateValue(String(value));

  return date ? DATE_LABEL_FORMATTER.format(date) : String(value);
}

function formatFullDateLabel(value: string | number | null | undefined): string {
  if (value === null || value === undefined || value === '') {
    return 'N/A';
  }

  const rawValue = String(value);
  const date = parseDateValue(rawValue);

  return date ? DATE_CARD_FORMATTER.format(date) : rawValue;
}

function buildOccupancyChartData(
  dashboard: OccupancyDashboardData | null,
): OccupancyChartPoint[] {
  if (!dashboard) {
    return [];
  }

  const points = new Map<string, OccupancyChartPoint>();

  dashboard.historical.forEach((item) => {
    if (!item.date) {
      return;
    }

    const point = points.get(item.date) ?? {
      date: item.date,
      occupancy_rate: null,
      predicted_occupancy_rate: null,
      confidence: null,
    };

    point.occupancy_rate = normalizeRate(item.occupancy_rate);
    points.set(item.date, point);
  });

  dashboard.forecast.forEach((item) => {
    if (!item.date) {
      return;
    }

    const point = points.get(item.date) ?? {
      date: item.date,
      occupancy_rate: null,
      predicted_occupancy_rate: null,
      confidence: null,
    };

    point.predicted_occupancy_rate = normalizeRate(item.predicted_occupancy_rate);
    point.confidence = normalizeRate(item.confidence);
    points.set(item.date, point);
  });

  return Array.from(points.values()).sort((left, right) => left.date.localeCompare(right.date));
}

function OccupancyTooltip({ active, label, payload }: OccupancyTooltipProps) {
  if (!active || !payload?.length) {
    return null;
  }

  const visiblePayload = payload.filter(
    (item) => item.value !== null && item.value !== undefined,
  );

  if (visiblePayload.length === 0) {
    return null;
  }

  return (
    <div className={styles.occupancyTooltip}>
      <p className={styles.tooltipTitle}>{formatFullDateLabel(label)}</p>
      {visiblePayload.map((item) => {
        const isPrediction = item.dataKey === 'predicted_occupancy_rate';
        const confidence = isPrediction ? item.payload?.confidence : null;

        return (
          <div key={String(item.dataKey ?? item.name)} className={styles.tooltipBlock}>
            <p className={styles.tooltipRow}>
              <span style={item.color ? { color: item.color } : undefined}>{item.name}</span>
              <strong>{formatPercentage(item.value)}</strong>
            </p>
            {confidence !== null && confidence !== undefined ? (
              <p className={styles.tooltipConfidence}>Confianza: {formatPercentage(confidence)}</p>
            ) : null}
          </div>
        );
      })}
    </div>
  );
}

type ChartCardProps = {
  title: string;
  isEmpty: boolean;
  className?: string;
  children: React.ReactNode;
};

function ChartCard({ title, isEmpty, className, children }: ChartCardProps) {
  return (
    <section className={[styles.chartCard, className].filter(Boolean).join(' ')}>
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
  const [dateRange, setDateRange] = useState<DateRangeParams>(() => getDefaultDates());
  const [appliedDateRange, setAppliedDateRange] = useState<DateRangeParams>(() => getDefaultDates());
  const { kpis, byMonth, byRoomType, byOffer, loading, error, fetchAll } = useRevenue();
  const {
    dashboard: occupancyDashboard,
    loading: occupancyLoading,
    error: occupancyError,
    fetchDashboard: fetchOccupancyDashboard,
  } = useOccupancyDashboard();

  useEffect(() => {
    fetchAll(appliedDateRange);
    fetchOccupancyDashboard({ ...appliedDateRange, forecast_days: FORECAST_DAYS });
  }, [appliedDateRange, fetchAll, fetchOccupancyDashboard]);

  const handleFilter = () => {
    setAppliedDateRange(dateRange);
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
  const occupancyChartData = buildOccupancyChartData(occupancyDashboard);
  const occupancyCards = occupancyDashboard
    ? [
        {
          label: 'Promedio predicho',
          value: formatRate(occupancyDashboard.avg_predicted_occupancy_rate),
          accent: 'forecast',
        },
        {
          label: 'Fecha pico predicha',
          value: formatFullDateLabel(occupancyDashboard.peak_predicted_date),
          accent: 'peakDate',
        },
        {
          label: 'Ocupación pico predicha',
          value: formatRate(occupancyDashboard.peak_predicted_occupancy_rate),
          accent: 'peakOccupancy',
        },
      ]
    : [];

  return (
    <div className="admin-content">
      <div className="admin-content__inner">
        <header className={`page-header ${styles.header}`}>
          <div>
            <h1 className="page-header__title">Dashboard</h1>
            <p className="page-header__subtitle">
              Monitor booking revenue, averages, performance, and occupancy forecasts.
            </p>
          </div>
        </header>

        <hr className="page-header__divider" />

        <section className={styles.filterBar} aria-label="Dashboard date filters">
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

        <section className={styles.occupancySection} aria-labelledby="occupancy-title">
          <div className={styles.sectionHeader}>
            <div>
              <h2 id="occupancy-title" className={styles.sectionTitle}>
                Predicción de ocupación
              </h2>
              <p className={styles.sectionSubtitle}>
                Ocupación histórica real y pronóstico para los próximos {FORECAST_DAYS} días.
              </p>
            </div>
          </div>

          {occupancyLoading ? (
            <div className={styles.stateMessage}>Cargando predicción de ocupación...</div>
          ) : occupancyError ? (
            <div className={styles.errorMessage}>
              No se pudo cargar la predicción de ocupación: {occupancyError}
            </div>
          ) : occupancyDashboard ? (
            <>
              <section
                className={`${styles.kpiGrid} ${styles.occupancyKpiGrid}`}
                aria-label="Occupancy forecast indicators"
              >
                {occupancyCards.map(({ label, value, accent }) => (
                  <article key={label} className={styles.kpiCard} data-accent={accent}>
                    <p className={styles.kpiLabel}>{label}</p>
                    <p className={styles.kpiValue}>{value}</p>
                  </article>
                ))}
              </section>

              <ChartCard
                title="Ocupación real vs predicha"
                isEmpty={occupancyChartData.length === 0}
                className={styles.occupancyChartCard}
              >
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart
                    data={occupancyChartData}
                    margin={{ top: 12, right: 16, left: 0, bottom: 0 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#E9DFD2" />
                    <XAxis
                      dataKey="date"
                      minTickGap={24}
                      tickFormatter={formatShortDateLabel}
                      tick={{ fontSize: 11, fill: '#6B6B6B' }}
                    />
                    <YAxis
                      domain={[0, 100]}
                      tickFormatter={formatPercentage}
                      tick={{ fontSize: 11, fill: '#6B6B6B' }}
                    />
                    <Tooltip content={<OccupancyTooltip />} />
                    <Legend verticalAlign="top" height={32} iconType="line" />
                    <Line
                      type="monotone"
                      dataKey="occupancy_rate"
                      name="Ocupación real"
                      stroke="#0C3D52"
                      strokeWidth={2}
                      dot={{ r: 3, fill: '#0C3D52', strokeWidth: 0 }}
                      activeDot={{ r: 5 }}
                      connectNulls={false}
                    />
                    <Line
                      type="monotone"
                      dataKey="predicted_occupancy_rate"
                      name="Ocupación predicha"
                      stroke="#1D9E75"
                      strokeWidth={2}
                      strokeDasharray="6 4"
                      dot={{ r: 3, fill: '#1D9E75', strokeWidth: 0 }}
                      activeDot={{ r: 5 }}
                      connectNulls={false}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </ChartCard>
            </>
          ) : (
            <div className={styles.stateMessage}>No hay predicción de ocupación disponible.</div>
          )}
        </section>
      </div>
    </div>
  );
}
