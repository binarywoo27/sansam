import "./HamBtn.css";

interface Props {
  onClick: React.MouseEventHandler<HTMLDivElement>;
}

function HamBtn({ onClick }: Props) {
  return (
    <div onClick={onClick}>
      <a className="menu-trigger">
        <span></span>
        <span></span>
        <span></span>
      </a>
    </div>
  );
}

export default HamBtn;
