export default function Divider({ color = '#F5F5F5', className = '' }) {
  return (
    <div
      className={className}
      style={{
        height: '1px',
        width: '100%',
        backgroundColor: color
      }}
      aria-hidden="true"
    />
  );
}
