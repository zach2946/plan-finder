import 'jquery';

export default function() {
  let states = [];
  if ($('#state-select').length > 0) {
    $.getJSON('/febassets/global/data/plan-finder.json', function(statesData) {
      states = statesData;
      $.each(states, function(i, state) {
        $('#state-select').append("<option value ='" + state.key + "'>" + state.name + '</option>');
      });
    });
    $('#state-select').change(function() {
      let selected = $(this).val();
      $('#county-select').removeAttr('disabled');
      $('#plan-url').attr('disabled', true);
      $('#plan-url').addClass('disabled');
      $('#county-select')
        .find('option')
        .remove();
      $('#county-select').append("<option value=''>-Select-</option>");
      let counties = _.find(states, function(state) {
        return state.key === selected;
      }).counties;
      $.each(counties, function(i, county) {
        $('#county-select').append("<option value='" + county.url + "'>" + county.county + '</option>');
      });
    });
    $('#county-select').change(function() {
      let selected = $(this).val();
      $('#plan-url').attr('href', selected);
      $('#plan-url').removeAttr('disabled');
      $('#plan-url').removeClass('disabled');
    });
  }
}
