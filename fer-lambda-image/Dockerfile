FROM amazon/aws-lambda-python:3.8

# Install the function's dependencies using file requirements.txt
COPY requirements.txt  .
RUN  pip3 install -r requirements.txt --target "${LAMBDA_TASK_ROOT}"

# Copy function code
COPY lambda_function.py ${LAMBDA_TASK_ROOT}

# Copy the model
COPY model /opt/ml/model

# Set the CMD to your handler
CMD [ "lambda_function.lambda_handler" ]