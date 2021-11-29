import React from "react";
import { Timeline } from "antd";

const TimelineStatus = ({ status = [] }) => {
  const TimelineItem = Timeline.Item;
  return (
    <Timeline mode="alternate">
      {
        status.map((statusItem, i) => 
        <TimelineItem key={i} dot={i === 0 && <i className="fa fa-clock" />} color={i === 0 ? "green" : "gray"}>
          {
            `${statusItem.descripcion} ${new Date(statusItem.fecha).toLocaleString()}`
          }
        </TimelineItem>)
      }
    </Timeline>
  )
}

export default TimelineStatus;