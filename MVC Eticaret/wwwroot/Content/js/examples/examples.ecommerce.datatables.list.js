(function($){'use strict';var ecommerceListDataTableInit=function(){var $ecommerceListTable=$('#datatable-ecommerce-list');$ecommerceListTable.dataTable({dom:'<"row justify-content-between"<"col-auto"><"col-auto">><"table-responsive"t>ip',columnDefs:[{targets:0,orderable:false}],pageLength:12,order:[],language:{paginate:{previous:'<i class="fas fa-chevron-left"></i>',next:'<i class="fas fa-chevron-right"></i>'}},drawCallback:function(){$ecommerceListTable.closest('.dataTables_wrapper').find('.dataTables_info').appendTo($ecommerceListTable.closest('.datatables-header-footer-wrapper').find('.results-info-wrapper'));$ecommerceListTable.closest('.dataTables_wrapper').find('.dataTables_paginate').appendTo($ecommerceListTable.closest('.datatables-header-footer-wrapper').find('.pagination-wrapper'));$ecommerceListTable.closest('.datatables-header-footer-wrapper').find('.pagination').addClass('pagination-modern pagination-modern-spacing justify-content-center');}});$(document).on('change','.results-per-page',function(){var $this=$(this),$dataTable=$this.closest('.datatables-header-footer-wrapper').find('.dataTable').DataTable();$dataTable.page.len($this.val()).draw();});$(document).on('keyup','.search-term',function(){var $this=$(this),$filterBy=$this.closest('.datatables-header-footer-wrapper').find('.filter-by'),$dataTable=$this.closest('.datatables-header-footer-wrapper').find('.dataTable').DataTable();if($filterBy.val()=='all'){$dataTable.search($this.val()).draw();}else{$dataTable.column(parseInt($filterBy.val())).search($this.val()).draw();}});$(document).on('change','.filter-by',function(){var $this=$(this),$searchField=$this.closest('.datatables-header-footer-wrapper').find('.search-term');$searchField.trigger('keyup');});$ecommerceListTable.find('.select-all').on('change',function(){if(this.checked){$ecommerceListTable.find('input[type="checkbox"]:not(.select-all)').prop('checked',true);}else{$ecommerceListTable.find('input[type="checkbox"]:not(.select-all)').prop('checked',false);}})};ecommerceListDataTableInit();}(jQuery));