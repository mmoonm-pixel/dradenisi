export const locations={
 pirabeiraba:{id:'pirabeiraba',name:'Pirabeiraba',address:'Rua Presidente Vargas, 593, Pirabeiraba, Joinville/SC.',lat:-26.2068098,lng:-48.9083570,source:'https://www.openstreetmap.org/way/271700703'},
 centro:{id:'centro',name:'Centro',address:'Rua Alexandre Dohler, 129, sala 503, Centro, Joinville/SC.',lat:-26.2976540,lng:-48.8461957,source:'https://www.openstreetmap.org/way/477139765'}
};
export const directionsUrl=id=>'https://www.google.com/maps/search/?api=1&query='+encodeURIComponent(locations[id].address);
export const clinic={name:'Dra. Denisi Coelho Gomes',whatsapp:'https://wa.me/5547988196276',phone:'(47) 98819-6276',instagram:'https://www.instagram.com/dra.denisi/'};
export const services=[
['Odontopediatria','Atendimento odontológico para bebês, crianças e adolescentes, com atenção às necessidades de cada fase.','Odontopediatria','spark'],
['Ortodontia e alinhadores','Avaliação e acompanhamento para o alinhamento dos dentes, com planejamento individualizado.','Ortodontia e alinhadores','align'],
['Implantes dentários','Avaliação para reposição de dentes perdidos, considerando as necessidades de cada paciente.','Implantes dentários','implant'],
['Clínica geral','Cuidados de prevenção e acompanhamento da saúde bucal de crianças e adultos.','Clínica geral','tooth'],
['Avaliação sobre sedação','Converse com a equipe sobre a indicação e a disponibilidade de sedação durante o atendimento.','Avaliação sobre sedação','moon']];
export const serviceOptions=[...services.map(s=>s[2]),'Ainda não sei / quero uma avaliação'];
export function todayJoinville(now=new Date()){const p=new Intl.DateTimeFormat('en-US',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);const v=t=>p.find(x=>x.type===t).value;return `${v('year')}-${v('month')}-${v('day')}`}
export function dateError(value,today=todayJoinville()){if(!/^\d{4}-\d{2}-\d{2}$/.test(value))return 'Selecione a data desejada.';const d=new Date(value+'T12:00:00Z');if(!Number.isFinite(d.getTime())||d.toISOString().slice(0,10)!==value)return 'Selecione uma data válida.';if(value<today)return 'Escolha uma data a partir de hoje.';if([0,6].includes(d.getUTCDay()))return 'Escolha um dia de segunda a sexta-feira.';return ''}
const clean=value=>String(value??'').trim();
export function validateBooking(data,today=todayJoinville()){
 return {
  name:clean(data.name)?'':'Informe o nome completo do paciente.',
  insurance:['Sim','Não'].includes(data.insurance)?'':'Informe se possui convênio odontológico.',
  insurer:data.insurance==='Sim'&&!clean(data.insurer)?'Informe o nome do convênio para a equipe verificar o atendimento.':'',
  location:Object.hasOwn(locations,data.location||'')?'':'Selecione o endereço desejado.',
  service:serviceOptions.includes(data.service)?'':'Selecione um serviço de interesse.',
  date:dateError(data.date||'',today)
 };
}
export function buildMessage(data){
 const [y,m,d]=data.date.split('-');const professional=data.professionalPreference==='informar'&&clean(data.professional)?clean(data.professional):'Sem preferência';
 return ['Olá! Gostaria de solicitar um agendamento.','','Nome completo do paciente: '+clean(data.name),'Possui convênio odontológico: '+data.insurance,...(data.insurance==='Sim'&&clean(data.insurer)?['Convênio: '+clean(data.insurer)]:[]),'Preferência por profissional: '+professional,'Endereço desejado: '+locations[data.location].address,'Serviço de interesse: '+data.service,`Data desejada: ${d}/${m}/${y}`,...[['Período',data.period],['Observação',data.note]].filter(([,v])=>clean(v)).map(([k,v])=>k+': '+clean(v)),'','Aguardo o atendimento da equipe e a confirmação de disponibilidade.'].join('\n');
}
export const whatsappUrl=data=>clinic.whatsapp+'?text='+encodeURIComponent(buildMessage(data));
