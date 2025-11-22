export default function ContractorCard({ contractor }:{contractor:any}){
return (
<div className="p-4 bg-white rounded-lg shadow flex gap-4 items-center">
<div className="w-20 h-20 bg-slate-100 rounded flex items-center justifycenter">ICON</div>
<div className="flex-1">
<h3 className="font-semibold">{contractor.companyName}</h3>
<p className="text-sm">Skills: {contractor.skills?.join(', ')}</p>
<p className="text-sm">Experience: {contractor.experienceYears || '—'}
years</p>
</div>
<div className="text-right">
<a className="block text-sm">{contractor.phone || contractor.email}</a>
</div>
</div>
);
}
