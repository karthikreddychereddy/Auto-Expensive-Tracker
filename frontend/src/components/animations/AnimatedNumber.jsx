import CountUp from "react-countup";

export default function AnimatedNumber({
  value = 0,
  prefix = "",
  suffix = "",
  decimals = 0,
}) {

  return (

    <CountUp
      start={0}
      end={Number(value) || 0}
      duration={1}
      separator=","
      decimals={decimals}
      prefix={prefix}
      suffix={suffix}
      preserveValue
    />

  );

}