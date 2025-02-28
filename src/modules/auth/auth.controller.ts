import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { ApiCreatedResponse, ApiOperation } from '@nestjs/swagger';
import { ResultDto } from '../../shared';
import { AuthService } from './auth.service';
import { LoginDto, SignupDto, TokenPairDto } from './dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: 'Регистрация нового пользователя' })
  @ApiCreatedResponse({ type: ResultDto })
  async signup(@Body() dto: SignupDto) {
    const result = await this.authService.signup(dto);

    return { result };
  }

  @Post('login')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: 'Вход для зарегистрированного пользователя' })
  @ApiCreatedResponse({ type: TokenPairDto })
  async login(@Body() dto: LoginDto): Promise<TokenPairDto> {
    return this.authService.login(dto);
  }
}
