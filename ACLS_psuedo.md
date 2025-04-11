# Description

This is a an adapted ACLS algorithm as the device should operate according to.

# Algorithm

Initial States:
- Device State: Off
- Main Clock: 00:00
- Pulse Check Clock: 2:00
- Start Button Pressed: false
- EPI Buttons Pressed: false
- Medication Buttons Pressed: false
- Medication Buttons Held: false
- Role Buttons Pressed: false
- End Button Pressed for 3 seconds: false
- Saftey Sequence Initiated?: Pause device

```python

def compression_button_pressed():

    # change pulse check clock to count down from 10 seconds
    # turn on rhythm buttons
    # start timer for 10 seconds
    # after 10 seconds: flash rhythm section buttons awaiting response
    if asystole_rhythm or PEA_rhythm:
        # change tally value and record in log
        # flash only compression button

    if ventral tachycardia (VT) rhythm or fibrillation(VF) _rhythm:
        # change tally value and record in log
        # flash both shock and compression buttons

        if 4 > VT_rhythm_count or VF_rhythm_count >= 2:
            # turn on AMIO button

        if VT_rhythm_count or VF_rhythm_count >= 4:
            # flash AMIO button
            # turn on ECMO button

            if AMIO_delivery_count >= 2:
                # turn off AMIO button
                # turn on LIDO button
            
    if compression_button_pressed:

        # restart 2-minute pulse_check clock
        # turn off Rhythm buttons
        # return to time_remaining_pulse_check_clock <= 30 seconds case     
    

if Device Started:
    if Start Button Pressed:
        # start main clock
        # pulse check set to 2:00
        # Flash Roles Buttons
        if first_round_of_compressions:
            # flash pulse check button


        elif not_first_round_of_compressions: # Compressions stuff
            if time_remaining_pulse_check_clock <= 30 seconds:
                # turn on pulse check button (turns solid)
                compression_button_pressed()
            if time_remaining_pulse_check_clock <= 0 seconds:
                # flash pulse check button
                compression_button_pressed()

        if EPI Button Pressed:
            # increment EPI Tally by 1
            # Initiate EPI Timer

            # After 3 minutes
                # Turn on EPI Button (Yellow)

            # After 5 minutes
                # Turn on EPI Button (White)

        if any Medication Button Pressed:

            # Flash Medication Button Green
            # Change repsective internal count
            # Turn Button Off
        
        if any Role Button Pressed:

            # Turn off Button
            # Record Button press and add note in log

        if End Button Pressed and End Button Held > 3 seconds:
            if an outcome has been pressed:
                # begin shutdown sequence
                # halt ALL clocks
                # for ALL Roles Buttons:
                    if any roles_button is flashing:
                        # Stop flashing
                    # Open popup logging output display (use some JS popups library to show text infront of UT)
                        # print log (include tallies)
                        # print device stop time and end code message
                    # log is updated with stop code

        if saftey_sequence is pressed OR saftey_sequence is initiated:
            # pause the code
```