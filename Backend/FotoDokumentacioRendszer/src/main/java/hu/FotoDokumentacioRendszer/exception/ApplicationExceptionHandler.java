package hu.FotoDokumentacioRendszer.exception;

import hu.FotoDokumentacioRendszer.exception.auth.UnauthorizedException;
import hu.FotoDokumentacioRendszer.exception.group.GroupAlreadyExistsException;
import hu.FotoDokumentacioRendszer.exception.group.GroupInUseException;
import hu.FotoDokumentacioRendszer.exception.group.GroupNotFoundException;
import hu.FotoDokumentacioRendszer.exception.image.ImageNotFoundException;
import hu.FotoDokumentacioRendszer.exception.user.UserAlreadyExistsException;
import hu.FotoDokumentacioRendszer.exception.user.UserNotFoundException;
import hu.FotoDokumentacioRendszer.exception.user.UserUploadedImageException;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseStatus;
@ControllerAdvice
public class ApplicationExceptionHandler {
    @ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "GROUP_NOT_FOUND")
    @ExceptionHandler(GroupNotFoundException.class)
    public void GroupNotFoundExceptionHandler(GroupNotFoundException ex){
    }
    @ResponseStatus(value = HttpStatus.CONFLICT, reason = "GROUP_ALREADY_EXISTS")
    @ExceptionHandler(GroupAlreadyExistsException.class)
    public void GroupAlreadyExistsExceptionHandler(GroupAlreadyExistsException ex){
    }

    @ResponseStatus(value = HttpStatus.CONFLICT, reason = "USER_ALREADY_EXISTS")
    @ExceptionHandler(UserAlreadyExistsException.class)
    public void UserAlreadyExistsExceptionHandler(UserAlreadyExistsException ex){
    }
    @ResponseStatus(value = HttpStatus.INTERNAL_SERVER_ERROR, reason = "USER_UPLOADED_IMAGE")
    @ExceptionHandler(UserUploadedImageException.class)
    public void UserUploadedImageException(UserUploadedImageException ex){
    }
    @ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "USER_NOT_FOUND")
    @ExceptionHandler(UserNotFoundException.class)
    public void UserNotFoundExceptionHandler(UserNotFoundException ex){
    }
    @ResponseStatus(value = HttpStatus.NOT_FOUND, reason = "IMAGE_NOT_FOUND")
    @ExceptionHandler(ImageNotFoundException.class)
    public void ImageNotFoundException(ImageNotFoundException ex){
    }

    @ResponseStatus(value = HttpStatus.UNAUTHORIZED, reason = "UNAUTHORIZED")
    @ExceptionHandler(UnauthorizedException.class)
    public void ImageNotFoundException(UnauthorizedException ex){
    }

    @ResponseStatus(value = HttpStatus.BAD_REQUEST, reason = "GROUP IN USE")
    @ExceptionHandler(GroupInUseException.class)
    public void GroupInUseException(GroupInUseException ex){
    }
}
