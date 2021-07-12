import React from 'react';
import { Icon, Grid, GridItem, ToastPreloader } from 'zmp-framework/react';

const AppItems = () => {
  const [toastLoading, setToastLoading] = React.useState(false);
  const items = [
    { icon: 'zi-chat-solid', label: 'Chat' },
    { icon: 'zi-photo-solid', label: 'Photo' },
    { icon: 'zi-star-solid', label: 'Star' },
    { icon: 'zi-more-diamond-solid', label: 'Apps' },
    { icon: 'zi-video-solid', label: 'Video' },
    { icon: 'zi-shield-solid', label: 'Shield' },
    { icon: 'zi-heart-solid', label: 'Heart' },
    { icon: 'zi-calendar-solid', label: 'Calendar' },
  ]

  const openToastLoading = () => {
    setToastLoading(true);
    setTimeout(() => {
      setToastLoading(false);
    }, 2000);
  };

  return (
    <div>
      <ToastPreloader visible={toastLoading} text="Loading..." />
      <Grid columns={4}>
        {items.map(item => (
          <GridItem
            label={item.label}
            style={{ backgroundColor: 'var(--zmp-color-w300)' }}
            key={item.icon}
            icon={<Icon zmp={item.icon} />}
            onClick={openToastLoading}
          />
        ))}
      </Grid>
    </div>
  )
}

AppItems.displayName = 'zmp-app-items'

export default AppItems
