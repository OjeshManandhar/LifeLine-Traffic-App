import React from 'react';
import { Text as T } from 'react-native';

// global
import { BlackColor, WorkSansRegular } from 'global/styles';

function Text({ style, children, ...props }) {
  return (
    <T style={[BlackColor, style, WorkSansRegular]} {...props}>
      {children}
    </T>
  );
}

export default Text;
