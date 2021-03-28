var data_funcs = {

	// params: mm, aaaa
	// return: o ultimo dia do mes
	get_last_day_of:function(_mes, _ano) {
		var fev_max = ((_ano%4) == 0) ? 29 : 28;
		switch ( _mes ) {
			case 1:
			case 3:
			case 5:
			case 7:
			case 8:
			case 10:
			case 12:
				return 31;
			break;
			case 2:
				return fev_max;
			break;
			default:
				return 30;
			break;
		}
	},
	// params: str[objeto-a-Analisar], valorInput
	// return: boolean
	is_max_value_for:function(_item, _valor) {
		_valor = parseInt(_valor);
		switch ( _item ){
			case 'hora'		:return (_valor > -1 && _valor < 24); break;
			case 'minuto'	:return (_valor > -1 && _valor < 60); break;
			case 'segundo'	:return (_valor > -1 && _valor < 60); break;
			case 'dia'		:return (_valor >  0 && _valor < 32); break;
			case 'mes'		:return (_valor >  0 && _valor < 13); break;
			case 'ano'		:return (_valor > 1970 && _valor < 2038); break;
		}
	},
	// params: str[dd/mm/aaaa], intStart, intEnd
	// return: int dia | mes | ou ano
	data_split:function(_data, _start, _end) { 
		if ( _data.search('/') == -1 ) { return false; }
		var novo = _data.replace(/\//g, '');
		return novo.substr(_start, _end);
	},
	// param: strData[dd/mm/aaaa]
	// return: boolean
	is_data_valida:function(_data){
		var dia = parseInt(this.data_split(_data, 0, 2)); 
		var mes = parseInt(this.data_split(_data, 2, 2)); 
		var ano = parseInt(this.data_split(_data, 4, 4));
		if ( !this.is_max_value_for('dia', dia) ) { return false; }
		if ( dia > this.get_last_day_of(mes, ano) ) { return false; }		
		if ( !this.is_max_value_for('mes', mes) ) { return false; }
		if ( !this.is_max_value_for('ano', ano) ) { return false; }
		return true;	
	},
	// params: str[dd/mm/aaaa]
	// return: boolean
	// se data_ini > data_fim = erro
	compara_datas:function(_data_ini, _data_fim) {
		// valida datas
		if ( !this.is_data_valida(_data_ini) ) { return false; }
		if ( !this.is_data_valida(_data_fim) ) { return false; }
		ano_ini = this.data_split(_data_ini, 4, 4);
		if ( !ano_ini ) { return false; }
		ano_fim = this.data_split(_data_fim, 4, 4);
		if ( !ano_fim ) { return false; }
		mes_ini = this.data_split(_data_ini, 2, 2);
		if ( !mes_ini ) { return false; }
		mes_fim = this.data_split(_data_fim, 2, 2);
		if ( !mes_fim ) { return false; }
		dia_ini = this.data_split(_data_ini, 0, 2);
		if ( !dia_ini ) { return false; }
		dia_fim = this.data_split(_data_fim, 0, 2);
		if ( !dia_fim ) { return false; }
		// inicia checagem		
		if ( ano_ini > ano_fim ) { 	
			return false;
		}else if ( ano_ini == ano_fim ){
			if ( mes_ini > mes_fim ) {
				return false;
			}else if ( mes_ini == mes_fim ){
				if ( dia_ini > dia_fim ){
					return false;
				}else{
					return true;
				}
			}
		}
		return true;
	},
	// param: str[dd/mm/aaaa]
	// return: new Date(aaaa, mm, dd)
	before_days_between:function(d){
		ano = this.data_split(d, 4, 4);
		mes = this.data_split(d, 2, 2);
		dia = this.data_split(d, 0, 2);
		return new Date(ano, mes, dia);
	},
	// retorna diferença entre 2 datas (data_menor, data_maior)
	// params: str[dd/mm/aaaa]
	// return: intDays
	get_days_between:function(dataMenor, dataMaior) {
		// The number of milliseconds in one day
		var ONE_DAY = 1000 * 60 * 60 * 24
		// Convert dates to new Date(Y,m,d)
		d1 = this.before_days_between(dataMaior);
		d2 = this.before_days_between(dataMenor);
		// Convert both dates to milliseconds
		var date1_ms = d1.getTime();
		var date2_ms = d2.getTime();
		// Calculate the difference in milliseconds
		var difference_ms = Math.abs(date1_ms - date2_ms);
		// Convert back to days and return
		return Math.round(difference_ms/ONE_DAY);
	},	
};