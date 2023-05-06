import { Card, CardBody } from 'reactstrap';
import PropTypes from 'prop-types';
import Link from 'next/link';

const TopCards = ({ bg, href, icon,  amount, subtitle }) => {
  return (
    <Card>
      <CardBody>
        <Link href={href} className='no-underline'>
        <div className="d-flex">
          <div className={`circle-box lg-box d-inline-block ${bg}`}>
            <i className={icon} />
          </div>
          <div className="ms-3">
            <h3 className="mb-0 font-medium text-blue-800">
               {amount}
            </h3>
            <small className="text-muted">{subtitle}</small>
          </div>
        </div>
          </Link>
      </CardBody>
    </Card>
  );
};

TopCards.propTypes = {
  bg: PropTypes.string,
  icon: PropTypes.string,
  earning: PropTypes.string,
  subtitle: PropTypes.string,
};


export default TopCards;
