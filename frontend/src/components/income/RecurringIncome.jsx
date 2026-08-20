import {
  useMemo,
} from "react";

import {
  FaSyncAlt,
} from "react-icons/fa";

import {
  useIncome,
} from "../../context/IncomeContext";

import {
  formatCurrency,
} from "../../utils/format";

export default function RecurringIncome() {
  const {
    income,
  } = useIncome();

  const recurring =
    useMemo(() => {
      const grouped = {};

      income.forEach(item => {
        if (
          !item.source ||
          !item.incomeDate
        ) {
          return;
        }

        const source =
          item.source.trim();

        const normalized =
          source.toLowerCase();

        const month =
          item.incomeDate
            .slice(0, 7);

        if (
          !grouped[
            normalized
          ]
        ) {
          grouped[
            normalized
          ] = {
            source,

            entries: [],

            months:
              new Set(),
          };
        }

        grouped[
          normalized
        ].entries.push(
          item
        );

        grouped[
          normalized
        ].months.add(
          month
        );
      });

      return Object.values(
        grouped
      )
        .filter(
          group =>
            group.months
              .size >= 2
        )
        .map(group => {
          const total =
            group.entries.reduce(
              (sum, item) =>
                sum +
                Number(
                  item.amount ||
                    0
                ),
              0
            );

          const average =
            group.entries
              .length > 0
              ? total /
                group.entries
                  .length
              : 0;

          return {
            source:
              group.source,

            count:
              group.entries
                .length,

            months:
              group.months
                .size,

            average,
          };
        })
        .sort(
          (a, b) =>
            b.months -
            a.months
        );

    }, [income]);

  return (
    <div
      className="
        rounded-3xl
        border
        border-slate-200
        bg-white
        p-6
        shadow-sm
        dark:border-slate-700
        dark:bg-slate-900
      "
    >
      <div className="mb-6 flex items-center gap-3">

        <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#0B6B57]/10 text-[#0B6B57]">
          <FaSyncAlt />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Recurring Income
          </h2>

          <p className="mt-1 text-sm text-slate-500">
            Income sources detected across multiple months.
          </p>
        </div>

      </div>

      {recurring.length ===
      0 ? (
        <div
          className="
            rounded-2xl
            border
            border-dashed
            border-slate-200
            p-8
            text-center
            dark:border-slate-700
          "
        >
          <FaSyncAlt className="mx-auto text-3xl text-slate-300" />

          <h3 className="mt-4 font-semibold text-slate-700 dark:text-white">
            No recurring income detected
          </h3>

          <p className="mt-2 text-sm leading-6 text-slate-500">
            A source will appear here when PaisaTrack detects income from the same source across multiple months.
          </p>

        </div>
      ) : (
        <div className="space-y-4">

          {recurring.map(
            item => (
              <div
                key={
                  item.source
                }
                className="
                  flex
                  items-center
                  justify-between
                  gap-4
                  rounded-2xl
                  bg-slate-50
                  p-4
                  dark:bg-slate-800
                "
              >
                <div className="min-w-0">

                  <h3 className="truncate font-semibold text-slate-800 dark:text-white">
                    {
                      item.source
                    }
                  </h3>

                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    {item.count} payments across{" "}
                    {item.months} months
                  </p>

                </div>

                <div className="shrink-0 text-right">

                  <p className="font-bold text-emerald-600">
                    {formatCurrency(
                      item.average
                    )}
                  </p>

                  <p className="mt-1 text-xs text-slate-400">
                    average payment
                  </p>

                </div>

              </div>
            )
          )}

        </div>
      )}

      <p className="mt-5 text-xs leading-5 text-slate-400">
        Recurring income is detected automatically from repeated income sources. It does not yet represent a scheduled recurring-income backend feature.
      </p>

    </div>
  );
}