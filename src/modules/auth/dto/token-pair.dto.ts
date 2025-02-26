import { ApiProperty } from '@nestjs/swagger';
import { TokenPair } from '../auth.types';

export class TokenPairDto implements TokenPair {
  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiZXhwIjoxNzQwNTYzMDY4fQ.P2iv_dmWigdT-eRq9f3-8fUXym9t_BDcQGqDuA6A18k',
  })
  accessToken: string;

  @ApiProperty({
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNzQwNTU5NDY4fQ.BxIwPXJEZplAKythf2wFNeSdSHzjrH67_DZuxfHkKvE',
  })
  refreshToken: string;
}
