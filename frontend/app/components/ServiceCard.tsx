export default function ServiceCard({ service }:{service:any}){
return (
<div className="p-3 bg-white rounded shadow">
<div className="font-semibold">{service.serviceType}</div>
<div className="text-sm">{service.details}</div>
<div className="text-xs text-slate-500">Status: {service.status}</div>
</div>
);
}

