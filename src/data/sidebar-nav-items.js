export default function () {
  return [{
    title: 'Главная',
    to: {
      name: 'dashboard',
    },
    htmlBefore: '<i class="material-icons">dashboard</i>',
    htmlAfter: '',
  },
    {
      title: 'Список расчетов',
      htmlBefore: '<i class="material-icons">fact_check</i>',
      to: {
        name: 'calculations',
      },
    }
  ];
}
