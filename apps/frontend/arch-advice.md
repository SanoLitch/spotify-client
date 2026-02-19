 /src
  ├── /transport-history-report
      ├── /domain                                     # Бизнес-логика (по классике можно назвать model)
      │   ├── transport.types.ts                      # Типы доменных моделей
      │   ├── transport.errors.ts                     # Кастомные доменные ошибки
      │   ├── transport-report.bus.ts                 # Локальная шина событий модуля (опционально, может быть как действительно шиной, либо сайд-эффекты redux, реакции mobx и т.д.)
      │   ├── transport-report.events.ts              # Типы доменных событий
      │   ├── transport-data.store.ts                 # Репозиторий конкретных транспортов
      │   ├── transport-position-history.store.ts     # Репозиторий посещенных точек транспортом
      │   ├── transport-report-filters.store.ts       # Фильтры таблицы
      │   ├── transport-report-sorting.store.ts       # Сортировка таблицы
      │   └── transport-root.store.ts                 # Фасад, объединяющий сторы (чисто для удобства)
      ├── /ui
      │   ├── transport-table.tsx                     # Компонент таблицы, где отображается места пребывания транспорта
      │   ├── transport-compliance-gauge.tsx          # Gauge-график для демонстрации некоего KPI прибытия транспортом в точку назначения
      │   ├── use-transport-table-filters.ts          # Хук для работы с фильрами таблицы (опционально, может быть use-case)
      │   ├── use-transport-table-sorting.ts          # Хук для работы с сортировкой внутри таблицы (опционально, может быть use-case)
      │   └── use-transport-table.ts                  # Хук для получения данных таблицы и обрабоки событий ею генерируемых (опционально, может быть use-case)
      ├── /lib
      │   ├── /api                                    # API-слой (спорно, возможно стоит перенести в shared или отдельный срез)
      │   │   ├── transport.api.ts                    # Реализация API-клиента
      │   │   ├── transport.dto.ts                    # Типизация ответа API-клиента
      │   │   ├── transport-data.mapper.ts            # Типизация ответа API-клиента
      │   │   ├── transport-postion.dto.ts            # Типизация ответа API-клиента
      │   │   ├── transport-postion.mapper.ts         # Типизация ответа API-клиента
      │   │   ├── transport-cargo.dto.ts              # Типизация ответа API-клиента
      │   │   ├── transport-cargo.mapper.ts           # Типизация ответа API-клиента
      │   │   ├── transport-filter.dto.ts             # Типизация ответа API-клиента
      │   │   ├── transport-filter.mapper.ts          # Типизация ответа API-клиента
      │   │   ├── transport-sorting.dto.ts            # Типизация ответа API-клиента
      │   │   ├── transport-sorting.mapper.ts         # Типизация ответа API-клиента
      │   │   └── transport.validator.ts              # Валидация ответов от API (например Zod-валидация)
      │   ├── /local-storage                          # Только для примера
      │   │   ├── persistent.provider.ts              # Обертка для работы с дaнными в LS
      │   │   ├── transport-filters.types.ts          # Типизация хранения данных в LS
      │   │   └── transport-sorting.types.ts          # Типизация хранения данных в LS
      ├ load-transport-table-data.case.ts             # Сценарии использования
      ├ filter-transport-table.case.ts                # Сценарии использования
  └   └ calcualte-compliance-kpi.case.ts              # Сценарии использования
