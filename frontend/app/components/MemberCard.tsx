export default function MemberCard({ member }:{member:any}){
return (
<div className="p-3 bg-white rounded shadow">{member.name} —
{member.designation}</div>
);
}
1