export const clinic={name:'Dra. Denisi Coelho Gomes',whatsapp:'https://wa.me/5547988196276',phone:'(47) 98819-6276',address:'Rua Presidente Vargas, 593, Pirabeiraba, Joinville/SC. CEP: 89239-080.',instagram:'https://www.instagram.com/dra.denisi/'};
export const services=[
['Odontopediatria','Atendimento odontológico para bebês, crianças e adolescentes, com atenção às necessidades de cada fase.','Odontopediatria','spark'],
['Ortodontia e alinhadores','Avaliação e acompanhamento para o alinhamento dos dentes, com planejamento individualizado.','Ortodontia e alinhadores','align'],
['Implantes dentários','Avaliação para reposição de dentes perdidos, considerando as necessidades de cada paciente.','Implantes dentários','implant'],
['Clínica geral','Cuidados de prevenção e acompanhamento da saúde bucal de crianças e adultos.','Clínica geral','tooth'],
['Avaliação sobre sedação','Converse com a equipe sobre a indicação e a disponibilidade de sedação durante o atendimento.','Avaliação sobre sedação','moon']];
export const serviceOptions=[...services.map(s=>s[2]),'Ainda não sei / quero uma avaliação'];
export function todayJoinville(now=new Date()){const p=new Intl.DateTimeFormat('en-US',{timeZone:'America/Sao_Paulo',year:'numeric',month:'2-digit',day:'2-digit'}).formatToParts(now);const v=t=>p.find(x=>x.type===t).value;return `${v('year')}-${v('month')}-${v('day')}`}
export function dateError(value,today=todayJoinville()){if(!/^\d{4}-\d{2}-\d{2}$/.test(value))return 'Selecione a data desejada.';const d=new Date(value+'T12:00:00Z');if(!Number.isFinite(d.getTime())||d.toISOString().slice(0,10)!==value)return 'Selecione uma data válida.';if(value<today)return 'Escolha uma data a partir de hoje.';if([0,6].includes(d.getUTCDay()))return 'Escolha um dia de segunda a sexta-feira.';return ''}
export function buildMessage(data){const [y,m,d]=data.date.split('-');return ['Olá! Gostaria de solicitar um agendamento com a Dra. Denisi.','','Nome: '+data.name.trim(),'Serviço: '+data.service,`Data desejada: ${d}/${m}/${y}`,...[['Período',data.period],['Atendimento para',data.patient],['Observação',data.note]].filter(([,v])=>v?.trim()).map(([k,v])=>k+': '+v.trim()),'','Aguardo a confirmação de disponibilidade. Obrigado(a)!'].join('\n')}
export const whatsappUrl=data=>clinic.whatsapp+'?text='+encodeURIComponent(buildMessage(data));
